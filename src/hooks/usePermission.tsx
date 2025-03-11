

import { useMemo } from 'react'

interface Permission {
  canView: boolean
  canAddEquipment: boolean
  canEditEquipment: boolean
  canDeleteEquipment: boolean
  canGenerateQR: boolean
  canAddMaintenance: boolean
  canEditMaintenance: boolean
  canDeleteMaintenance: boolean
  canAddComponent: boolean
  canEditComponent: boolean
  canDeleteComponent: boolean
  canAddRepair: boolean
}

export const usePermission = ({ userRole }: { userRole: string }):Permission => {


  const permissions: Permission = useMemo(() => {
    const perms = {
      canView: true, // Todos los roles pueden ver
      canAddEquipment: false,
      canEditEquipment: false,
      canDeleteEquipment: false,
      canGenerateQR: false,
      canAddMaintenance: false,
      canEditMaintenance: false,
      canDeleteMaintenance: false,
      canAddComponent: false,
      canEditComponent: false,
      canDeleteComponent: false,
      canAddRepair: false,
    };

    if (userRole === 'admin') {
      perms.canAddEquipment = true;
      perms.canEditEquipment = true;
      perms.canDeleteEquipment = true;
      perms.canGenerateQR = true;
      perms.canAddMaintenance = true;
      perms.canEditMaintenance = true;
      perms.canDeleteMaintenance = true;
      perms.canAddComponent = true;
      perms.canEditComponent = true;
      perms.canDeleteComponent = true;
      perms.canAddRepair = true;
    } else if (userRole === 'operador') {
      perms.canAddEquipment = true;
      perms.canEditEquipment = true;
      perms.canGenerateQR = true;
      perms.canAddMaintenance = true;
      perms.canEditMaintenance = true;
      perms.canAddComponent = true;
      perms.canEditComponent = true;
      // Los operadores no pueden eliminar equipos ni componentes
    } else if (userRole === 'usuario') {
      perms.canAddMaintenance = true; // Alta de mantenimientos diarios
      perms.canAddRepair = true; // Alta de reparaciones
      perms.canAddComponent = true;
      perms.canDeleteComponent = true;
      perms.canGenerateQR = true;
      // Los usuarios no pueden editar equipos, componentes o eliminarlos
    }

    return perms;
  }, [userRole]);

  return permissions
}
