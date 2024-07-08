import React from "react";
import { Grid, Typography } from "@mui/material";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import AnnouncementCard from "../../components/Dashboard/AnnouncementCard";

const Dashboard = () => {
  return (
    <>
      <Grid container spacing={3}>
        {/* Card Grande */}
        <Grid item xs={12} md={8}>  
          <DashboardCard 
            title="Card Grande" 
            subtitle="Este é um card grande"
            height="100%"
          >
            <Typography variant="body1">Conteúdo do card grande.</Typography>
          </DashboardCard>
        </Grid>
        {/* Cards Pequenos */}
        <Grid item xs={12} md={4} container spacing={3}>
          <Grid item xs={12}>
          <AnnouncementCard
            totalAvisos={3}
            totalEventos={7}
          />
          </Grid>
          <Grid item xs={12}>
            <DashboardCard 
              title="Card Pequeno 2" 
              subtitle="Este é um card pequeno"
            >
              <Typography variant="body1">Conteúdo do card pequeno 2.</Typography>
            </DashboardCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
