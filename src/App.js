import clsx from 'clsx';
import styles from './App.module.scss'
import { WiTime3 } from 'react-icons/wi';
import { TbLetterC, TbNumber0, TbNumber1, TbNumber2, TbNumber3, TbNumber4, TbNumber5, TbNumber6, TbNumber7, TbNumber8, TbNumber9, TbParentheses, TbPlusMinus, TbRuler3 } from 'react-icons/tb';
import { PiMathOperationsFill } from 'react-icons/pi';
import { LuDelete } from 'react-icons/lu';
import { LiaPercentSolid } from 'react-icons/lia';
import { FaDivide, FaEquals, FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import { BsDot } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';

function App() {
    const [currentResult, setCurrentResult] = useState();
    const [textareaValue, setTextareaValue] = useState('');
    const textareaTag = useRef();
    const num0 = useRef();
    const num1 = useRef();
    const num2 = useRef();
    const num3 = useRef();
    const num4 = useRef();
    const num5 = useRef();
    const num6 = useRef();
    const num7 = useRef();
    const num8 = useRef();
    const num9 = useRef();
    const plus = useRef();
    const minus = useRef();
    const times = useRef();
    const divide = useRef();
    const equal = useRef();
    const backspace = useRef();
    useEffect(() => {
        num0.current.onclick = () => {
            setTextareaValue(pre => pre + '0');
        }
        num1.current.onclick = () => {
            setTextareaValue(pre => pre + '1');
        }
        num2.current.onclick = () => {
            setTextareaValue(pre => pre + '2');
        }
        num3.current.onclick = () => {
            setTextareaValue(pre => pre + '3');
        }
        num4.current.onclick = () => {
            setTextareaValue(pre => pre + '4');
        }
        num5.current.onclick = () => {
            setTextareaValue(pre => pre + '5');
        }
        num6.current.onclick = () => {
            setTextareaValue(pre => pre + '6');
        }
        num7.current.onclick = () => {
            setTextareaValue(pre => pre + '7');
        }
        num8.current.onclick = () => {
            setTextareaValue(pre => pre + '8');
        }
        num9.current.onclick = () => {
            setTextareaValue(pre => pre + '9');
        }
        plus.current.onclick = () => {
            if ('+-*/'.indexOf(textareaValue.charAt(textareaValue.length - 1)) !== -1) {
                setTextareaValue(pre => pre.slice(0, pre.length - 1));
            }
            setTextareaValue(pre => pre + '+');
        }
        minus.current.onclick = () => {
            if ('+-*/'.indexOf(textareaValue.charAt(textareaValue.length - 1)) !== -1) {
                setTextareaValue(pre => pre.slice(0, pre.length - 1));
            }
            setTextareaValue(pre => pre + '-');
        }
        times.current.onclick = () => {
            if ('+-*/'.indexOf(textareaValue.charAt(textareaValue.length - 1)) !== -1) {
                setTextareaValue(pre => pre.slice(0, pre.length - 1));
            }
            setTextareaValue(pre => pre + '*');
        }
        divide.current.onclick = () => {
            if ('+-*/'.indexOf(textareaValue.charAt(textareaValue.length - 1)) !== -1) {
                setTextareaValue(pre => pre.slice(0, pre.length - 1));
            }
            setTextareaValue(pre => pre + '/');
        }
        backspace.current.onclick = () => {
            setTextareaValue(pre => pre.slice(0, pre.length - 1))
        }
        
        try {
            const result = eval(textareaValue);
            setCurrentResult(result)
        } catch (e) {
            console.log('error: invalid expression');
        } 
        
    }, [textareaValue])
    useEffect(() => {
        textareaTag.current.focus();
    }, [])
    return (
        <div className={styles.App}>
            <div className={styles['App-container']}>
                <header className={styles['result-display-section']}>
                    <textarea 
                        name="input-box" 
                        id="input-box"
                        value={textareaValue}
                        onChange={(e)=>setTextareaValue(e.target.value)}
                        ref={textareaTag}/>
                    <div className={styles['result-box']}>{currentResult}</div>
                </header>
                <div className={styles['controler-section']}>
                    <div className={styles['tools']}>
                        <div className={styles['history']}><WiTime3 /></div>
                        <div className={styles['rule']}> <TbRuler3 /></div>
                        <div className={styles['expan-calc']}> <PiMathOperationsFill /></div>
                    </div>
                    <div className={styles['delete']} ref={backspace}><LuDelete /></div>
                </div>
                <main className={styles['keypad-container']}>
                    <div className={clsx(styles['C-key'])} ><TbLetterC /></div>
                    <div className={clsx(styles['operator'])}><TbParentheses /></div>
                    <div className={clsx(styles['operator'])}><LiaPercentSolid /></div>
                    <div className={clsx(styles['operator'])} ref={divide}><FaDivide /></div>
                    <div className={clsx(styles['digit'])} ref={num7}><TbNumber7 /></div>
                    <div className={clsx(styles['digit'])} ref={num8}><TbNumber8 /></div>
                    <div className={clsx(styles['digit'])} ref={num9}><TbNumber9 /></div>
                    <div className={clsx(styles['operator'])} ref={times}><FaTimes /></div>
                    <div className={clsx(styles['digit'])} ref={num4}><TbNumber4 /></div>
                    <div className={clsx(styles['digit'])} ref={num5}><TbNumber5 /></div>
                    <div className={clsx(styles['digit'])} ref={num6}><TbNumber6 /></div>
                    <div className={clsx(styles['operator'])} ref={minus}><FaMinus /></div>
                    <div className={clsx(styles['digit'])} ref={num1}><TbNumber1 /></div>
                    <div className={clsx(styles['digit'])} ref={num2}><TbNumber2 /></div>
                    <div className={clsx(styles['digit'])} ref={num3}><TbNumber3 /></div>
                    <div className={clsx(styles['operator'])} ref={plus}><FaPlus /></div>
                    <div className={clsx(styles['plus-minus'])}><TbPlusMinus /></div>
                    <div className={clsx(styles['digit'])} ref={num0}><TbNumber0 /></div>
                    <div className={clsx(styles['dot'])}><BsDot /></div>
                    <div className={clsx(styles['equal'])} ref={equal}><FaEquals /></div>
                </main>
            </div>
        </div>
    );
}

export default App;
