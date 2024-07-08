// AnnouncementCard.tsx
import React from "react";
import { CardContent, Typography, Box } from "@mui/material";
import DashboardCard from "../DashboardCard";
import { StyledProgressBar, ProgressBarFill, ProgressBarSegment } from "./style";

type Props = {
  totalAvisos: number;
  totalEventos: number;
};

const AnnouncementCard = ({ totalAvisos, totalEventos }: Props) => {
  const totalComunicados = totalAvisos + totalEventos;
  const avisosPercent = totalComunicados > 0 ? Math.round((totalAvisos / totalComunicados) * 100) : 0;
  const eventosPercent = totalComunicados > 0 ? Math.round((totalEventos / totalComunicados) * 100) : 0;

  return (
    <DashboardCard title="Comunicados" subtitle={`Total: ${totalComunicados}`}>
      <CardContent>
        <Typography variant="h3">
          {totalComunicados}
        </Typography>

        <StyledProgressBar>
          <ProgressBarFill avisosPercent={avisosPercent} eventosPercent={eventosPercent}>
            <ProgressBarSegment percent={avisosPercent} color="#04E47C" />
            <ProgressBarSegment percent={eventosPercent} color="#64b5f6" />
          </ProgressBarFill>
        </StyledProgressBar>
        
        <Box display="flex" justifyContent="center" mt={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
            <Box sx={{ width: 10, height: 10, bgcolor: '#04E47C', mr: 1 }} />
            <Typography variant="body2">Avisos</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 10, height: 10, bgcolor: '#64b5f6', mr: 1 }} />
            <Typography variant="body2">Eventos</Typography>
          </Box>
        </Box>
      </CardContent>
    </DashboardCard>
  );
};

export default AnnouncementCard;
