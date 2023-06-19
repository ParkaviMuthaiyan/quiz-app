import style from './option-button.module.css';

function OptionButton({ text, onClick, selected }) {
    return <button className={`${style.button} ${selected ? style.selected : ''}`} onClick={onClick}>{text}</button>;
}

export default OptionButton;