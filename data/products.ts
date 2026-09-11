export type Brand = "Kontron" | "Iskratel" | "C-Data";

export type Technology = "GPON" | "Redes ópticas" | "Fibra óptica";

export type Product = {
  id: string;
  name: string;
  brand: Brand;
  technology: Technology;
  shortDescription: string;
  technicalDescription: string;
};

export const brands: Brand[] = ["Kontron", "Iskratel", "C-Data"];

export const technologies: Technology[] = [
  "GPON",
  "Redes ópticas",
  "Fibra óptica",
];

export const products: Product[] = [
  {
    id: "kontron-netbox-olt-8000",
    name: "Kontron NetBox OLT-8000",
    brand: "Kontron",
    technology: "GPON",
    shortDescription:
      "Chasis OLT de nivel operador para desplegar servicios GPON de alta capacidad en redes metropolitanas.",
    technicalDescription:
      "OLT modular con hasta 8 slots para tarjetas de línea GPON, soporta hasta 1024 ONUs por chasis, interfaces uplink 10G SFP+, gestión centralizada vía SNMP/TR-069 y redundancia de fuente de poder. Diseñado para operadores que requieren escalar servicios residenciales y corporativos sobre una misma plataforma.",
  },
  {
    id: "kontron-edgelink-ont-100",
    name: "Kontron EdgeLink ONT-100",
    brand: "Kontron",
    technology: "Fibra óptica",
    shortDescription:
      "Terminal óptico residencial compacto para conexiones FTTH de alta velocidad.",
    technicalDescription:
      "ONT de una sola unidad con 1 puerto GPON, 4 puertos Gigabit Ethernet y 1 puerto de voz POTS. Soporta VLAN por servicio, QoS y aprovisionamiento remoto. Pensado para instalaciones residenciales y pequeñas oficinas conectadas a redes de fibra óptica punto a multipunto.",
  },
  {
    id: "iskratel-innbox-g62",
    name: "Iskratel Innbox G62",
    brand: "Iskratel",
    technology: "GPON",
    shortDescription:
      "Router ONT todo en uno con Wi-Fi integrado, ideal para ofertas residenciales de triple play.",
    technicalDescription:
      "Combina interfaz GPON, router doméstico con Wi-Fi dual band, 4 puertos LAN Gigabit y 2 puertos FXS para telefonía. Soporta gestión remota vía TR-069, actualizaciones OTA y priorización de tráfico para video e IPTV.",
  },
  {
    id: "iskratel-si3000-olt-compact",
    name: "Iskratel SI3000 OLT Compact",
    brand: "Iskratel",
    technology: "GPON",
    shortDescription:
      "OLT compacta pensada para operadores regionales que inician su despliegue de fibra.",
    technicalDescription:
      "Equipo de 1U con 4 a 8 puertos PON, capacidad de hasta 128 ONUs por puerto, interfaces uplink 1G/10G y software de gestión SI3000 para monitoreo de la red óptica. Permite crecimiento gradual sin reemplazar la plataforma inicial.",
  },
  {
    id: "iskratel-msan-optical",
    name: "Iskratel Optical MSAN",
    brand: "Iskratel",
    technology: "Redes ópticas",
    shortDescription:
      "Nodo de acceso multiservicio que combina voz, datos y video sobre infraestructura óptica.",
    technicalDescription:
      "Multi-Service Access Node con tarjetas intercambiables para xDSL, Ethernet y PON sobre el mismo chasis, permitiendo migración gradual de cobre a fibra. Incluye gestión unificada y soporte para servicios legacy de voz junto a banda ancha de nueva generación.",
  },
  {
    id: "cdata-fd1204s-olt",
    name: "C-Data FD1204S GPON OLT",
    brand: "C-Data",
    technology: "GPON",
    shortDescription:
      "OLT de 4 puertos GPON con excelente relación costo-beneficio para operadores en expansión.",
    technicalDescription:
      "Chasis 1U con 4 puertos PON (hasta 128 ONUs por puerto), 2 puertos uplink 10G SFP+ y 2 puertos 1G, gestión vía CLI, SNMP y Web GUI. Soporta VLAN, QoS y control de ancho de banda por usuario, ideal para ISPs que buscan desplegar rápido con inversión moderada.",
  },
  {
    id: "cdata-onu-74604",
    name: "C-Data FTTH ONU 74604",
    brand: "C-Data",
    technology: "Fibra óptica",
    shortDescription:
      "ONU económica para conexiones FTTH con 4 puertos Ethernet, lista para volumen residencial.",
    technicalDescription:
      "Terminal óptico de usuario con 1 puerto GPON y 4 puertos Gigabit Ethernet, compatible con múltiples OLTs del mercado. Soporta aprovisionamiento automático, VLAN tagging y modo bridge o router según la necesidad del operador.",
  },
  {
    id: "cdata-splitter-plc-1x16",
    name: "C-Data Splitter PLC 1x16",
    brand: "C-Data",
    technology: "Redes ópticas",
    shortDescription:
      "Divisor óptico pasivo esencial para distribuir la señal en redes PON de forma eficiente.",
    technicalDescription:
      "Splitter óptico PLC de relación 1x16 en formato caja o bandeja rack, con pérdida de inserción baja y estabilidad térmica. Componente clave en la arquitectura punto a multipunto para llevar la señal de la OLT a múltiples ONUs.",
  },
];
