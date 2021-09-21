import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 7,
    borderRadius: 10,
    width: '18rem',
    margin: 'auto',
    marginTop: 4,
  },
  colorPrimary: {
    // backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    backgroundColor: '#00ff70'
  },
  bar: {
    borderRadius: 0,
    backgroundColor: 'red'
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
});

export default function Bar ({ 
  damage, 
  wins, 
  hisAccumulate, 
  hit, 
  setHit, 
  hp, 
  punchMe, 
  me, 
  he, 
  myAccumulate, 
  damageMe, 
  dontmodifybar,
  winner
}) {

  const classes = useStyles();

  const [acumulador, setAcumulador] = useState(0);
  const [damageToMe, setDamageToMe] = useState(0);

  // const [acumuladorIsOneHundred, setAcumuladorIsOneHundred] = useState(false);
  const [gane, setGane] = useState(false)

  const notPassTheLine = (result) => {
    if(result >= 100) {
      return 100
    }
    return result
  }

  useEffect(() => {

    if(hit) {
      let barRise = [0];
      barRise.push(damage);

      const result = (barRise.reduce((plus, value) => value + plus, acumulador));

      setAcumulador(notPassTheLine(result));
    
      setHit(false);
    }

    if(hp) {
      if(acumulador >= 100 ) { // deberia poder reemplazar por el hp
        setTimeout(() => {
          wins('fighter__win');
        }, 500);
        hisAccumulate(acumulador);
      }
    }
  }, [damage, hit, acumulador]);


  useEffect(() => {
    let barRise = [0];
    barRise.push(damageMe * ((Math.random(0, 1) / 5 ) * 2.5));
    const result = (barRise.reduce((plus, value) => value + plus, damageToMe));

    const iWinOrNot = () => {
      if(winner){
        console.log('ganaste');
      }
      else {
        setDamageToMe(notPassTheLine(result));
        //console.log('todavia no'); // RESOLVER PORQUE ENTRA PRIMERO 
      }
    }

    if(me && punchMe) {
      // RESPECTO AL PORCENTAJE PARA EL HP.
      setTimeout(() => {
        iWinOrNot()
      }, 5000);
    }

    if(me) {
      if(damageToMe >= 100 ) { // deberia poder reemplazar por el hp
        setTimeout(() => {
          wins('fighter__win');
        }, 500);
        myAccumulate(damageToMe);
      }
    };
  }, [punchMe, winner]);


  return (
    <div className={classes.root}>
      <BorderLinearProgress variant="determinate" value={he ? acumulador : damageToMe}/>
    </div>
  );
}