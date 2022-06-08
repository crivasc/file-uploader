import React,{useRef, useState, useEffect} from 'react'
import axios from "axios"
import PropTypes from 'prop-types';
import {mainUrl, ets, API, TOKEN} from '../../utils/httpRequest'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import styles from './Files.module.css'

const Files = () => {

    const [progreso, setProgreso] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
        setProgreso((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);

        return () => {
        clearInterval(timer);
        };
    }, []);

    const [Mensajes, setMensajes] = useState('')
    const [ShowP, setShowP] = useState(false)
    const [Preview, setPreview] = useState([])
    const [Preload, setPreload] = useState(false)

    const [Progress, setProgress] = useState(0);

    const hiddenFileInput = useRef(null);

    const trae=()=>{
        setPreview([])
        ets().then(res=>{
            res.assets.length && setPreview(res.assets[0].path)
        })
    }
    useEffect(() => {
        trae()
    }, [])
    

    const handleChange = event => {
        setShowP(false)
        if (event.target.files) {
            setPreload(true)
            const pic = event.target.files[0];

            const formData = new FormData();
            formData.append("files[]", pic);

            const sect = axios.post(`${API}cockpit/addAssets?token=${TOKEN}`, formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const progress = (progressEvent.loaded / progressEvent.total) * 100;

                    progress==100 && setPreload(false)
                    setProgress(progress)
                }
            }).then(res=>{
                trae()
                setShowP(true)
            }).catch(error=>'Error:'+error)
        }
    };


    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const clearer=()=>{
        setPreview([])
        setShowP(false)
    }

  return (
    <div className={styles.formContainer}>
        <input className={styles.hiddenInput} type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}

                  accept="image/*"/>
        
        {Preload && Progress!=0 
            ? <Stack spacing={2} direction="row" className={styles.progBar}
                sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress variant="determinate" value={Progress}/>
                    <Box sx={{
                        top: 0,
                        left: '10%',
                        bottom: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color:'#219b9b'
                    }}
                    >
                    <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(Progress)}%`}
                    </Typography>
                </Box>
        
                </Stack>
            : <IconButton className={styles.sender} onClick={handleClick}>
                    <CloudUploadIcon sx={{fontSize:'2em'}}/>
                </IconButton>
        }
        
        {ShowP ? 
            <div className={styles.previewStyle}>
                <IconButton onClick={clearer} className={styles.closer}>
                    <CancelIcon sx={{fontSize:'2em'}}/>
                </IconButton>
                <img src={`${mainUrl}storage/uploads${Preview}?token=${TOKEN}`} width={300}/>
            </div> 
            : <></>
        }
        
        <span>{Mensajes}</span>
    </div>          
  )
}

export default Files