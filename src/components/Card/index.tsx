import './styles.css'

export type CardProps = {
    name: string;
    time: string;
}

export function Card(props: CardProps) {

    return(
        <>
            {
                !props.name || !props.time ? '' :
                <div className='card'>
                    <strong>{props.name ? props.name : 'USUÁRIO'}</strong>
                    <small>{props.time ? props.time : 'TIME'}</small>
                </div>
            }
        </>
    );
}