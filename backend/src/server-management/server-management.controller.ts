import { Controller, Get, Post, Body, Param, NotFoundException, Put, Query, BadRequestException, ValidationPipe, Delete } from '@nestjs/common';
import { DockerComposeService } from 'src/docker-compose/docker-compose.service';
import { ServerManagementService } from './server-management.service';
import { UpdateServerConfigDto } from './dto/server-config.model';

@Controller('servers')
export class ServerManagementController {
  constructor(
    private readonly dockerComposeService: DockerComposeService,
    private readonly managementService: ServerManagementService,
  ) {}

  @Get()
  async getAllServers() {
    return this.dockerComposeService.getAllServerConfigs();
  }

  @Get('all-status')
  async getAllServersStatus() {
    const allStatus = await this.managementService.getAllServersStatus();
    return allStatus;
  }

  @Get(':id')
  async getServer(@Param('id') id: string) {
    const config = await this.dockerComposeService.getServerConfig(id);
    if (!config) {
      throw new NotFoundException(`Server with ID "${id}" not found`);
    }
    return config;
  }

  @Post()
  async createServer(@Body(new ValidationPipe()) data: UpdateServerConfigDto) {
    try {
      const id = data.id;

      if (!id) {
        throw new BadRequestException('Server ID is required');
      }

      // Validar el ID del servidor (solo caracteres alfanuméricos, guiones y guiones bajos)
      if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
        throw new BadRequestException('Server ID can only contain letters, numbers, hyphens, and underscores');
      }

      const serverConfig = await this.dockerComposeService.createServer(id, data);
      return {
        success: true,
        message: `Server "${id}" created successfully`,
        server: serverConfig,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(error.message || 'Failed to create server');
    }
  }

  @Delete(':id')
  async deleteServer(@Param('id') id: string) {
    const config = await this.dockerComposeService.getServerConfig(id);
    if (!config) {
      throw new NotFoundException(`Server with ID "${id}" not found`);
    }

    const result = await this.managementService.deleteServer(id);
    return {
      success: result,
      message: result ? `Server "${id}" deleted successfully` : `Failed to delete server "${id}"`,
    };
  }

  @Get(':id/resources')
  async getServerResources(@Param('id') id: string) {
    const serverExists = await this.dockerComposeService.getServerConfig(id);
    if (!serverExists) {
      throw new NotFoundException(`Server with ID "${id}" not found`);
    }

    const status = await this.managementService.getServerStatus(id);
    if (status === 'not_found') {
      throw new NotFoundException(`Server with ID "${id}" not found`);
    }

    if (status !== 'running') {
      return {
        cpuUsage: 'N/A',
        memoryUsage: 'N/A',
        memoryLimit: 'N/A',
        diskUsage: 'N/A',
        status: status,
      };
    }

    const resources = await this.managementService.getServerResources(id);
    return {
      ...resources,
      status: status,
    };
  }

  @Put(':id')
  async updateServer(@Param('id') id: string, @Body(new ValidationPipe()) config: UpdateServerConfigDto) {
    const updatedConfig = await this.dockerComposeService.updateServerConfig(id, config);
    if (!updatedConfig) {
      throw new NotFoundException(`Server with ID "${id}" not found`);
    }
    return updatedConfig;
  }

  @Post(':id/restart')
  async restartServer(@Param('id') id: string) {
    const result = await this.managementService.restartServer(id);
    return {
      success: result,
      message: result ? 'Server restarted successfully' : 'Failed to restart server',
    };
  }

  @Post(':id/clear-data')
  async clearServerData(@Param('id') id: string) {
    const config = await this.dockerComposeService.getServerConfig(id);
    if (!config) {
      throw new NotFoundException(`Server with ID "${id}" not found`);
    }

    const result = await this.managementService.clearServerData(id);
    return {
      success: result,
      message: result ? 'Server data cleared successfully' : 'Failed to clear server data',
    };
  }

  @Get(':id/status')
  async getServerStatus(@Param('id') id: string) {
    const status = await this.managementService.getServerStatus(id);
    return { status };
  }

  @Get(':id/info')
  async getServerInfo(@Param('id') id: string) {
    const serverInfo = await this.managementService.getServerInfo(id);
    if (!serverInfo.exists) {
      throw new NotFoundException(`Server with ID "${id}" not found`);
    }

    // Get configuration info as well
    const config = await this.dockerComposeService.getServerConfig(id);

    return {
      ...serverInfo,
      config: config || undefined,
    };
  }

  @Get(':id/logs')
  async getServerLogs(@Param('id') id: string, @Query('lines') lines?: number) {
    return this.managementService.getServerLogs(id, lines || 100);
  }

  @Post(':id/command')
  async executeCommand(@Param('id') id: string, @Body() body: { command: string; rconPort: string; rconPassword?: string }) {
    return this.managementService.executeCommand(id, body.command, body.rconPort, body.rconPassword);
  }

  @Post(':id/start')
  async startServer(@Param('id') id: string) {
    const result = await this.managementService.startServer(id);
    return {
      success: result,
      message: result ? 'Server started successfully' : 'Failed to start server',
    };
  }

  @Post(':id/stop')
  async stopServer(@Param('id') id: string) {
    const result = await this.managementService.stopServer(id);
    return {
      success: result,
      message: result ? 'Server stopped successfully' : 'Failed to stop server',
    };
  }
}
