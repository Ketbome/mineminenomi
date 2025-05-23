/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { ServerConfig } from "@/lib/types/types";
import Image from "next/image";
import { motion } from "framer-motion";

interface ServerTypeTabProps {
  config: ServerConfig;
  updateConfig: (field: keyof ServerConfig, value: any) => void;
  onSave: () => Promise<boolean>;
}

export const ServerTypeTab: FC<ServerTypeTabProps> = ({ config, updateConfig, onSave }) => {
  return (
    <Card className="bg-gray-900/60 border-gray-700/50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-emerald-400 font-minecraft flex items-center gap-2">
          <Image src="/images/server-icon.png" alt="Server Type" width={24} height={24} className="opacity-90" />
          Tipo de Servidor
        </CardTitle>
        <CardDescription className="text-gray-300">Selecciona el tipo de servidor de Minecraft que deseas configurar</CardDescription>
      </CardHeader>

      <CardContent>
        <RadioGroup value={config.serverType} onValueChange={(value: "VANILLA" | "FORGE" | "AUTO_CURSEFORGE") => updateConfig("serverType", value)} className="space-y-4">
          <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }} className={`flex items-start space-x-4 rounded-md p-4 ${config.serverType === "VANILLA" ? "bg-emerald-600/10 border border-emerald-600/30" : "bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60"}`}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-md bg-gray-800/70 border border-gray-700/50 flex-shrink-0">
              <Image src="/images/grass.webp" alt="Vanilla" width={24} height={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="VANILLA" id="vanilla" className="border-emerald-600/50" />
                <Label htmlFor="vanilla" className="text-base font-medium text-gray-100 font-minecraft">
                  Vanilla
                </Label>
              </div>
              <p className="text-sm text-gray-300 mt-1">Servidor básico de Minecraft sin mods ni plugins. Ideal para jugar en modo supervivencia clásico.</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }} className={`flex items-start space-x-4 rounded-md p-4 ${config.serverType === "FORGE" ? "bg-emerald-600/10 border border-emerald-600/30" : "bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60"}`}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-md bg-gray-800/70 border border-gray-700/50 flex-shrink-0">
              <Image src="/images/anvil.webp" alt="Forge" width={24} height={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="FORGE" id="forge" className="border-emerald-600/50" />
                <Label htmlFor="forge" className="text-base font-medium text-gray-100 font-minecraft">
                  Forge
                </Label>
              </div>
              <p className="text-sm text-gray-300 mt-1">Servidor con soporte para mods usando Forge. Requiere configurar la versión de Forge específica a utilizar.</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }} className={`flex items-start space-x-4 rounded-md p-4 ${config.serverType === "AUTO_CURSEFORGE" ? "bg-emerald-600/10 border border-emerald-600/30" : "bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60"}`}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-md bg-gray-800/70 border border-gray-700/50 flex-shrink-0">
              <Image src="/images/enchanted-book.webp" alt="CurseForge" width={24} height={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="AUTO_CURSEFORGE" id="curseforge" className="border-emerald-600/50" />
                <Label htmlFor="curseforge" className="text-base font-medium text-gray-100 font-minecraft">
                  CurseForge Modpack
                </Label>
              </div>
              <p className="text-sm text-gray-300 mt-1">Instala automáticamente modpacks de CurseForge. Se puede configurar mediante URL, Slug o ZIP del modpack.</p>
            </div>
          </motion.div>
        </RadioGroup>
      </CardContent>

      <CardFooter className="flex justify-end pt-4 border-t border-gray-700/40">
        <Button type="button" onClick={onSave} className="bg-emerald-600 hover:bg-emerald-700 text-white font-minecraft">
          <Save className="mr-2 h-4 w-4" />
          Guardar
        </Button>
      </CardFooter>
    </Card>
  );
};
