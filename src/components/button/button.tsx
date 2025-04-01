
import { HTMLAttributes, ReactNode } from 'react'
import style from './button.module.css'

type TButtonProps = {
    children: ReactNode;
    onClick?: ()=>void;
    variant?: 'contained'|'outline'
    icon?: string
    isLoading?: boolean
} & HTMLAttributes<HTMLButtonElement>

export function Button({onClick, children,icon, variant='contained', className, isLoading, ...rest}: TButtonProps ) {
    const styleButton = variant==='contained'?style.btn:style.btnOutline
    return <button {...rest} className={` ${className} ${styleButton} ${style.common}`} onClick={onClick}>{isLoading&&<img alt='Иконка кнопки' src={icon||''}/>}{children}</button>
}