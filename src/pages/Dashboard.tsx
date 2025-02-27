import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

// Interface pour représenter un drapeau avec son état et son score
interface Flag {
  status: string;
  score: number;
}

function Dashboard() {
  // État pour l'équipe rouge
  const [redFlag, setRedFlag] = useState<Flag>({ status: 'Libre', score: 0 });
  // État pour l'équipe bleue
  const [blueFlag, setBlueFlag] = useState<Flag>({ status: 'Libre', score: 0 });

  // Fonction pour récupérer les scores via HTTP
  const fetchScores = async () => {
    try {
      const response = await fetch('http://172.20.10.14:8999/drapeau/score');
      const data = await response.json();
      // data contient { "Rouge": tempsRouge, "Bleue": tempsBleu }
      const tempsRouge = data.Rouge;
      const tempsBleu = data.Bleue;

      // Met à jour l'état des drapeaux et les scores
      setRedFlag({ status: tempsRouge > 0 ? 'Capturé' : 'Libre', score: tempsRouge });
      setBlueFlag({ status: tempsBleu > 0 ? 'Capturé' : 'Libre', score: tempsBleu });
    } catch (error) {
      console.error('Erreur lors de la récupération des scores :', error);
    }
  };

  // Récupère les scores toutes les 2 secondes
  useEffect(() => {
    fetchScores(); // Appel initial
    const interval = setInterval(fetchScores, 2000); // Appel toutes les 2 secondes
    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard des Drapeaux
      </Typography>
      <Grid container spacing={3}>
        {/* Partie pour l'équipe rouge */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="error">
                Équipe Rouge
              </Typography>
              <Typography variant="body1">
                Drapeau : {redFlag.status}
              </Typography>
              <Typography variant="body1">
                Score : {redFlag.score}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Partie pour l'équipe bleue */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="primary">
                Équipe Bleue
              </Typography>
              <Typography variant="body1">
                Drapeau : {blueFlag.status}
              </Typography>
              <Typography variant="body1">
                Score : {blueFlag.score}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;