/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, HelpCircle } from "lucide-react";
import { ServerConfig } from "@/lib/types/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

interface AdvancedTabProps {
  config: ServerConfig;
  updateConfig: (field: keyof ServerConfig, value: any) => void;
  onSave: () => Promise<boolean>;
}

export const AdvancedTab: FC<AdvancedTabProps> = ({ config, updateConfig, onSave }) => {
  return (
    <Card className="bg-gray-900/60 border-gray-700/50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-emerald-400 font-minecraft flex items-center gap-2">
          <Image src="/images/command-block.webp" alt="Avanzado" width={24} height={24} className="opacity-90" />
          Configuración Avanzada
        </CardTitle>
        <CardDescription className="text-gray-300">Opciones avanzadas para la configuración de tu servidor</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2 p-4 rounded-md bg-gray-800/50 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <Label htmlFor="dockerImage" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
              <Image src="/images/barrier.webp" alt="Docker" width={16} height={16} />
              Imagen Docker
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                  <p>Imagen Docker oficial a utilizar para el servidor</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input id="dockerImage" value={config.dockerImage} onChange={(e) => updateConfig("dockerImage", e.target.value)} placeholder="java17" className="bg-gray-800/70 text-gray-200 border-gray-700/50 focus:border-emerald-500/50 focus:ring-emerald-500/30" />
          <p className="text-xs text-gray-400">Imagen Docker a utilizar (por defecto: itzg/minecraft-server:latest)</p>
        </div>

        <div className="space-y-2 p-4 rounded-md bg-gray-800/50 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <Label htmlFor="minecraftVersion" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
              <Image src="/images/grass.webp" alt="Versión" width={16} height={16} />
              Versión de Minecraft
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                  <p>Versión específica de Minecraft a instalar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input id="minecraftVersion" value={config.minecraftVersion} onChange={(e) => updateConfig("minecraftVersion", e.target.value)} placeholder="1.19.2" className="bg-gray-800/70 text-gray-200 border-gray-700/50 focus:border-emerald-500/50 focus:ring-emerald-500/30" />
          <p className="text-xs text-gray-400">Versión específica de Minecraft a utilizar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 p-4 rounded-md bg-gray-800/50 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <Label htmlFor="idleTimeout" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
                <Image src="/images/clock.webp" alt="Tiempo" width={16} height={16} />
                Tiempo Inactivo (min)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                    <p>Tiempo antes de expulsar jugadores inactivos</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input id="playerIdleTimeout" type="number" value={config.playerIdleTimeout} onChange={(e) => updateConfig("playerIdleTimeout", String(e.target.value))} placeholder="60" className="bg-gray-800/70 text-gray-200 border-gray-700/50 focus:border-emerald-500/50 focus:ring-emerald-500/30" />
            <p className="text-xs text-gray-400">Tiempo en minutos antes de expulsar a jugadores inactivos (0 para desactivar)</p>
          </div>

          <div className="space-y-2 p-4 rounded-md bg-gray-800/50 border border-gray-700/50">
            <div className="flex items-center justify-between">
              <Label htmlFor="stopDelay" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
                <Image src="/images/emerald.webp" alt="Retardo" width={16} height={16} />
                Retardo de Detención (seg)
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                    <p>Tiempo de espera antes de detener forzosamente el servidor</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input id="stopDelay" type="number" value={config.stopDelay} onChange={(e) => updateConfig("stopDelay", e.target.value)} placeholder="60" className="bg-gray-800/70 text-gray-200 border-gray-700/50 focus:border-emerald-500/50 focus:ring-emerald-500/30" />
            <p className="text-xs text-gray-400">Tiempo en segundos a esperar antes de detener forzosamente el servidor</p>
          </div>
        </div>

        <div className="space-y-2 p-4 rounded-md bg-gray-800/50 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <Label htmlFor="restartPolicy" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
              <Image src="/images/hopper.webp" alt="Reinicio" width={16} height={16} />
              Política de Reinicio
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                  <p>Determina cómo se comportará el contenedor cuando finalice su ejecución</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select value={config.restartPolicy} onValueChange={(value) => updateConfig("restartPolicy", value as "no" | "always" | "on-failure" | "unless-stopped")}>
            <SelectTrigger id="restartPolicy" className="bg-gray-800/70 text-gray-200 border-gray-700/50 focus:ring-emerald-500/30">
              <SelectValue placeholder="Selecciona la política de reinicio" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
              <SelectItem value="no">No reiniciar</SelectItem>
              <SelectItem value="always">Siempre reiniciar</SelectItem>
              <SelectItem value="on-failure">Reiniciar en caso de error</SelectItem>
              <SelectItem value="unless-stopped">Reiniciar a menos que se detenga manualmente</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-400">Política de reinicio del contenedor Docker</p>
        </div>

        <div className="space-y-2 p-4 rounded-md bg-gray-800/50 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <Label htmlFor="dockerVolumes" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
              <Image src="/images/chest.webp" alt="Volúmenes" width={16} height={16} />
              Volúmenes Docker
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                  <p>Mapeos adicionales de volúmenes para el contenedor Docker</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Textarea
            id="dockerVolumes"
            value={config.dockerVolumes}
            onChange={(e) => updateConfig("dockerVolumes", e.target.value)}
            placeholder="./mc-data:/data
./modpacks:/modpacks:ro"
            className="min-h-20 bg-gray-800/70 text-gray-200 border-gray-700/50 focus:border-emerald-500/50 focus:ring-emerald-500/30"
          />
          <p className="text-xs text-gray-400">Mapeos de volúmenes Docker (uno por línea, formato: ruta-local:ruta-contenedor)</p>
        </div>

        <div className="space-y-2 p-4 rounded-md bg-gray-800/50 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <Label htmlFor="envVars" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
              <Image src="/images/enchanted-book.webp" alt="Variables" width={16} height={16} />
              Variables de Entorno
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                  <p>Variables de entorno adicionales para personalizar el servidor</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Textarea
            id="envVars"
            value={config.envVars}
            onChange={(e) => updateConfig("envVars", e.target.value)}
            placeholder="ENABLE_AUTOPAUSE=TRUE
MAX_TICK_TIME=60000"
            className="min-h-20 bg-gray-800/70 text-gray-200 border-gray-700/50 focus:border-emerald-500/50 focus:ring-emerald-500/30"
          />
          <p className="text-xs text-gray-400">Variables de entorno adicionales para el contenedor (una por línea, formato: CLAVE=VALOR)</p>
        </div>

        <div className="space-y-4 p-5 rounded-md bg-gray-800/70 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/images/ender_chest.webp" alt="Backup" width={20} height={20} />
              <h3 className="text-emerald-400 font-minecraft text-md">Configuración de Copias de Seguridad</h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-300 text-sm">Activar Backups</span>
              <Switch checked={config.enableBackup || false} onCheckedChange={(checked: boolean) => updateConfig("enableBackup", checked)} className="data-[state=checked]:bg-emerald-500" />
            </div>
          </div>

          {config.enableBackup && (
            <div className="space-y-5 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="backupMethod" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
                      <Image src="/images/chest.webp" alt="Método" width={16} height={16} />
                      Método de Backup
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                          <p>Método utilizado para realizar las copias de seguridad</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select value={config.backupMethod || "tar"} onValueChange={(value) => updateConfig("backupMethod", value)}>
                    <SelectTrigger id="backupMethod" className="bg-gray-800/70 text-gray-200 border-gray-700/50 focus:ring-emerald-500/30">
                      <SelectValue placeholder="Selecciona el método" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                      <SelectItem value="tar">tar (compresión)</SelectItem>
                      <SelectItem value="rsync">rsync (incremental)</SelectItem>
                      <SelectItem value="restic">restic (incremental encriptado)</SelectItem>
                      <SelectItem value="rclone">rclone (remoto)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="backupName" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
                      <Image src="/images/name_tag.webp" alt="Nombre" width={16} height={16} />
                      Nombre de Backup
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                          <p>Nombre usado para identificar los archivos de backup</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input id="backupName" value={config.backupName || "world"} onChange={(e) => updateConfig("backupName", e.target.value)} placeholder="world" className="bg-gray-800/70 text-gray-200 border-gray-700/50 focus:border-emerald-500/50 focus:ring-emerald-500/30" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="backupInterval" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
                      <Image src="/images/clock.webp" alt="Intervalo" width={16} height={16} />
                      Intervalo de Backup
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                          <p>Tiempo entre cada backup (ej: 24h, 2h 30m)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input id="backupInterval" value={config.backupInterval || "24h"} onChange={(e) => updateConfig("backupInterval", e.target.value)} placeholder="24h" className="bg-gray-800/70 text-gray-200 border-gray-700/50 focus:border-emerald-500/50 focus:ring-emerald-500/30" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="backupInitialDelay" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
                      <Image src="/images/compass.webp" alt="Retardo" width={16} height={16} />
                      Retardo Inicial
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                          <p>Tiempo de espera antes del primer backup</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input id="backupInitialDelay" value={config.backupInitialDelay || "2m"} onChange={(e) => updateConfig("backupInitialDelay", e.target.value)} placeholder="2m" className="bg-gray-800/70 text-gray-200 border-gray-700/50 focus:border-emerald-500/50 focus:ring-emerald-500/30" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="backupPruneDays" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
                      <Image src="/images/shears.webp" alt="Poda" width={16} height={16} />
                      Días de Retención
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                          <p>Eliminar backups más antiguos que este número de días</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input id="backupPruneDays" type="number" value={config.backupPruneDays || "7"} onChange={(e) => updateConfig("backupPruneDays", e.target.value)} placeholder="7" className="bg-gray-800/70 text-gray-200 border-gray-700/50 focus:border-emerald-500/50 focus:ring-emerald-500/30" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="backupDestDir" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
                      <Image src="/images/ender_chest.webp" alt="Destino" width={16} height={16} />
                      Directorio Destino
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                          <p>Ruta donde se guardarán los backups</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input id="backupDestDir" value={config.backupDestDir || "/backups"} onChange={(e) => updateConfig("backupDestDir", e.target.value)} placeholder="/backups" className="bg-gray-800/70 text-gray-200 border-gray-700/50 focus:border-emerald-500/50 focus:ring-emerald-500/30" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="backupExcludes" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
                      <Image src="/images/barrier.webp" alt="Excluir" width={16} height={16} />
                      Archivos a Excluir
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                          <p>Patrones de archivos a excluir del backup (separados por comas)</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input id="backupExcludes" value={config.backupExcludes || "*.jar,cache,logs,*.tmp"} onChange={(e) => updateConfig("backupExcludes", e.target.value)} placeholder="*.jar,cache,logs,*.tmp" className="bg-gray-800/70 text-gray-200 border-gray-700/50 focus:border-emerald-500/50 focus:ring-emerald-500/30" />
                  <p className="text-xs text-gray-400">Archivos y directorios que no se incluirán en el backup</p>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-3">
                  <Switch id="backupOnStartup" checked={config.backupOnStartup !== false} onCheckedChange={(checked) => updateConfig("backupOnStartup", checked)} className="data-[state=checked]:bg-emerald-500" />
                  <Label htmlFor="backupOnStartup" className="text-gray-200 font-minecraft text-sm">
                    Realizar backup al iniciar
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                        <p>Realizar un backup inmediatamente después de iniciar el servidor</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex items-center gap-3">
                  <Switch id="pauseIfNoPlayers" checked={config.pauseIfNoPlayers || false} onCheckedChange={(checked) => updateConfig("pauseIfNoPlayers", checked)} className="data-[state=checked]:bg-emerald-500" />
                  <Label htmlFor="pauseIfNoPlayers" className="text-gray-200 font-minecraft text-sm">
                    Pausar backups cuando no hay jugadores
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                          <HelpCircle className="h-4 w-4 text-gray-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                        <p>No realizar backups automáticos cuando no hay jugadores conectados</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {config.backupMethod === "tar" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tarCompressMethod" className="text-gray-200 font-minecraft text-sm flex items-center gap-2">
                      <Image src="/images/anvil.webp" alt="Compresión" width={16} height={16} />
                      Método de Compresión
                    </Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 p-0 bg-transparent hover:bg-gray-700/50">
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 border-gray-700 text-gray-200">
                          <p>Algoritmo de compresión para los archivos tar</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select value={config.tarCompressMethod || "gzip"} onValueChange={(value) => updateConfig("tarCompressMethod", value as "gzip" | "bzip2" | "zstd")}>
                    <SelectTrigger id="tarCompressMethod" className="bg-gray-800/70 text-gray-200 border-gray-700/50 focus:ring-emerald-500/30">
                      <SelectValue placeholder="Método de compresión" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                      <SelectItem value="gzip">gzip (estándar)</SelectItem>
                      <SelectItem value="bzip2">bzip2 (mejor compresión)</SelectItem>
                      <SelectItem value="zstd">zstd (rápido)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end pt-4 border-t border-gray-700/40">
        <Button type="button" onClick={onSave} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-minecraft">
          <Save className="h-4 w-4" />
          Guardar Configuración
        </Button>
      </CardFooter>
    </Card>
  );
};
