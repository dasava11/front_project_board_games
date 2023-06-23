import React from 'react'
import { Box, Link, Text } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react'
import Instagram  from '../../Photos/Instagram.svg';
import Faceboock from '../../Photos/Faceboock.svg'
import dados from '../../Photos/dados.png'
import style from '../Footer/Footer.module.css'

function Footer() {
  return (
    <div>
        <Box bg="#000035" w='100%' py='15px' color='#FFFFFF' position="fixed" bottom={0} as="footer">
          <Text fontFamily='Roboto' position='fixed' p='40px'>Follow us </Text> 
          <img src={Instagram} alt='instagram' className={style.imgI}/>
          <img src={Faceboock} alt='instagram' className={style.imgF}/>
          <img src={dados} alt='instagram' className={style.imgD}/>
          <Box marginBottom='-30px'>
            <Text color='#FFFFFF' marginLeft='84%' font-family= 'Roboto' marginBottom='5px'>Suscribe to our Newsletter</Text>
            <Input color='#FFFFFF' fontFamily='Roboto' size='sm' w='330px'p='5px'marginLeft='81.5%' bgColor='#D9D9D9'/>
            <Text marginLeft='46%'>All rights reserved</Text>
          </Box>
        </Box>
    </div>
  )
}

export default Footer
