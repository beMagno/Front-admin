import React from "react";
import { Card, CardContent, Typography, Stack, Box } from "@mui/material";

type Props = {
  title?: string;
  subtitle?: string;
  action?: JSX.Element | any;
  children?: JSX.Element;
  height?: string; // Propriedade de altura personalizada
};

const DashboardCard = ({ title, subtitle, children, action, height }: Props) => {
  return (
    <Card elevation={2} style={{ height: height }}>
      <CardContent style={{ padding: "30px" }}>
        {title && (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Box>
              <Typography variant="h5">{title}</Typography>
              {subtitle && (
                <Typography variant="subtitle2" color="textSecondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
            {action}
          </Stack>
        )}
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
