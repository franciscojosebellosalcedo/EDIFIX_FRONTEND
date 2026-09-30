export const navItems = [
    {
        label: 'Dashboard',
        icon: 'bi-grid-1x2-fill',
        children: [],
    },
    {
        label: 'Edificios',
        icon: 'bi-buildings',
        children: ['Edificios', 'Pisos', 'Áreas', 'Equipos'],
    },
    {
        label: 'Mantenimiento',
        icon: 'bi-tools',
        children: ['Solicitudes', 'Órdenes', 'Preventivos', 'Historial'],
    },
    {
        label: 'Personal',
        icon: 'bi-people',
        children: ['Empleados', 'Técnicos'],
    },
    {
        label: 'Inventario',
        icon: 'bi-box-seam',
        children: [
            'Productos',
            'Categorías',
            'Almacenes',
            'Existencias',
            'Movimientos',
        ],
    },
    {
        label: 'Reportes',
        icon: 'bi-bar-chart',
        children: [
            'Mantenimientos',
            'Solicitudes',
            'Equipos',
            'Técnicos',
            'Inventario',
        ],
    },
    {
        label: 'Configuración',
        icon: 'bi-gear',
        children: ['Empresa', 'Usuarios', 'Roles'],
    },
];

export const stats = [
    {
        label: 'Activos totales',
        value: '248',
        detail: '+6 este mes',
        icon: 'bi-boxes',
        tone: 'blue',
    },
    {
        label: 'Órdenes abiertas',
        value: '18',
        detail: '5 requieren atención',
        icon: 'bi-wrench-adjustable',
        tone: 'amber',
    },
    {
        label: 'Incidentes del mes',
        value: '03',
        detail: '−2 vs. mes anterior',
        icon: 'bi-exclamation-triangle',
        tone: 'red',
    },
    {
        label: 'Stock bajo',
        value: '07',
        detail: 'Revisar inventario',
        icon: 'bi-box-seam',
        tone: 'violet',
    },
];

export const activities = [
    [
        'OT-2024-018',
        'Revisión de unidad HVAC — Torre A',
        'Hace 12 min',
        'En progreso',
        'warning',
    ],
    [
        'INC-2024-006',
        'Fuga de agua en baño — Piso 3',
        'Hace 38 min',
        'Crítico',
        'danger',
    ],
    [
        'REQ-2024-042',
        'Cambio de luminaria — Recepción',
        'Hace 1 h',
        'Asignada',
        'info',
    ],
    [
        'OT-2024-017',
        'Mantenimiento preventivo ascensor',
        'Hace 2 h',
        'Completada',
        'success',
    ],
    [
        'REQ-2024-041',
        'Ajuste de temperatura — Sala Norte',
        'Hace 3 h',
        'Nueva',
        'secondary',
    ],
];

export const systems = [
    [
        'HVAC',
        'bi-wind',
        'Operativo',
        'Última revisión hace 8 min',
        'success',
    ],
    [
        'Eléctrico',
        'bi-lightning-charge',
        'Operativo',
        'Última revisión hace 22 min',
        'success',
    ],
    [
        'Plomería',
        'bi-droplet',
        'Atención',
        'Fuga detectada en Piso 3',
        'warning',
    ],
    [
        'Ascensores',
        'bi-arrow-up-square',
        'Operativo',
        'Última revisión hace 1 h',
        'success',
    ],
    [
        'Contra incendios',
        'bi-fire',
        'Operativo',
        'Última revisión hace 3 h',
        'success',
    ],
    [
        'Seguridad',
        'bi-camera-video',
        'Operativo',
        '32 cámaras conectadas',
        'success',
    ],
];

export const pendingOrders = [
    [
        'OT-2024-018',
        'Revisión unidad HVAC — Torre A',
        'Climatización',
        'J. Ramírez',
        'Alta',
        'Hoy',
    ],
    [
        'OT-2024-016',
        'Reemplazo luminarias estacionamiento',
        'Eléctrico',
        'L. Gómez',
        'Media',
        '22 Ago',
    ],
    [
        'OT-2024-015',
        'Mantenimiento bomba hidráulica',
        'Plomería',
        'Sin asignar',
        'Alta',
        '23 Ago',
    ],
];