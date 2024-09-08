import clsx from 'clsx';
import styles from './App.module.scss';
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
    // const listKey = useRef(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/']);
    let isUpdate = useRef(true);
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
    const CKeyTag = useRef();
    const parentheses = useRef();
    const dot = useRef();
    useEffect(() => {
        const updateValue = (value) => {
            const len = textareaValue.length;
            if ('+-*/'.includes(value)) {
                if ('+-*/'.includes(textareaValue.charAt(len - 1))) {
                    setTextareaValue(pre => pre.slice(0, pre.length - 1));
                }
                if (textareaValue === '' || !'0123456789+-*/()'.includes(textareaValue.charAt(textareaValue.length - 1))) {
                    console.log("don't update");
                    
                    isUpdate.current = false;
                }
                
            }
            if ('*/'.includes(value)) {
                if (textareaValue === '' || textareaValue.charAt(len - 1) === '(') {
                    console.log("don't update");
                    
                    isUpdate.current = false;
                }
            }
            if ('0123456789'.includes(value)) {
                if (textareaValue.charAt(len - 1) === ')') {
                    value = '*' + value;
                }
            }
            if (isUpdate.current === true) {
                setTextareaValue(pre => pre + value);
            }
            else {
                isUpdate.current = true;
            }
            console.log('clicked key');
            textareaTag.current.focus();
        };
        num0.current.onclick = () => updateValue('0');
        num1.current.onclick = () => updateValue('1');
        num2.current.onclick = () => updateValue('2');
        num3.current.onclick = () => updateValue('3');
        num4.current.onclick = () => updateValue('4');
        num5.current.onclick = () => updateValue('5');
        num6.current.onclick = () => updateValue('6');
        num7.current.onclick = () => updateValue('7');
        num8.current.onclick = () => updateValue('8');
        num9.current.onclick = () => updateValue('9');
        plus.current.onclick = () => updateValue('+');
        minus.current.onclick = () => updateValue('-');
        times.current.onclick = () => updateValue('*');
        divide.current.onclick = () => updateValue('/');
        backspace.current.onclick = () => {
            setTextareaValue(pre => pre.slice(0, pre.length - 1));
        };
        CKeyTag.current.onclick = () => {
            setTextareaValue('');
        };
        parentheses.current.onclick = () => {
            /**
             *  - số lượng open > số lượng close => ktr
             *         + nếu trước đó là dấu mở, thì vẫn là mở => (
             *         + nếu trước đó là dấu +-* / thì vẫn mở => (
             *          + ngược lại là đóng => )
             * 
             *  - nếu bằng: ktr tiếp
             * nếu trước đó là con số hoặc dấu )  => *(
             * nếu trước đó là 
             */
            let value = ''
            const quantityOfOpen = textareaValue.split('(').length -1;
            const quantityOfClose = textareaValue.split(')').length - 1;
            const len = textareaValue.length;
            if (textareaValue.trim().length === 0) {
                value = '(';
            } else if (quantityOfOpen > quantityOfClose) {
                if (textareaValue.charAt(len - 1) === '(') {
                    value = '(';
                } else if ('+-*/'.includes(textareaValue.charAt(len - 1))) {
                    value = '(';
                } else {
                    value = ')';
                }
            } else if (quantityOfOpen === quantityOfClose) {
                if ('0123456789)'.includes(textareaValue.charAt(len - 1))) {
                    value = '*(';
                } else {
                    value = '('
                }
            } else {
                console.error('ERROR: ta đây gia cát lượng cũng không lường được, là lỗi NGU đó má');
                
            }
            setTextareaValue(pre => pre + value)
        }
        dot.current.onclick = () => {
            /**
             * value = '.' nếu trước đó là một con số, và chữ số con trỏ đang đứng chưa có dấu châm
             * value = '' nếu trước đó là một số đã chứa dấu chấm
             * value = '0.' trường hợp còn lại
             */
            let value = '';
            const len = textareaValue.length;
            let lastNumber = textareaValue.match(/-?\d+(\.\d+)?(?=\s*$)/) ? textareaValue.match(/-?\d+(\.\d+)?(?=\s*$)/)[0] : '';
            console.log(textareaValue, '$and$', lastNumber);
            
            if (textareaValue !== '' && '0123456789'.includes(textareaValue.charAt(len - 1)) && !lastNumber.includes('.')) {
                
                value = '.';
            } else if (lastNumber.includes('.') || textareaValue.charAt(len - 1) === '.') {
                value = '';
            } else {
                value = '0.';
            }
            setTextareaValue(pre => pre + value);
        }

        console.log('useEffect');
        try {
            const result = eval(textareaValue);
            setCurrentResult(result);
        } catch (e) {
            setCurrentResult('');
            console.log('error: invalid expression');
        }

    }, [textareaValue]);
    useEffect(() => {
        textareaTag.current.focus();
        document.title = 'My Calculator';
    }, []);
    return (
        <div className={styles.App}>
            <div className={styles['App-container']}>
                <header className={styles['result-display-section']}>
                    <textarea
                        name="input-box"
                        id="input-box"
                        value={textareaValue}
                        onChange={(e) => setTextareaValue(e.target.value)}
                        ref={textareaTag} />
                    <div className={styles['result-box']}>{currentResult ? Math.round((currentResult + Number.EPSILON) * 1e12) / 1e12 : ''}</div>
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
                    <div className={clsx(styles['key'], styles['C-key'])} ref={CKeyTag}><TbLetterC /></div>
                    <div className={clsx(styles['key'], styles['operator'])} ref={parentheses}><TbParentheses /></div>
                    <div className={clsx(styles['key'], styles['operator'])}><LiaPercentSolid /></div>
                    <div className={clsx(styles['key'], styles['operator'])} ref={divide}><FaDivide /></div>
                    <div className={clsx(styles['key'], styles['digit'])} ref={num7}><TbNumber7 /></div>
                    <div className={clsx(styles['key'], styles['digit'])} ref={num8}><TbNumber8 /></div>
                    <div className={clsx(styles['key'], styles['digit'])} ref={num9}><TbNumber9 /></div>
                    <div className={clsx(styles['key'], styles['operator'])} ref={times}><FaTimes /></div>
                    <div className={clsx(styles['key'], styles['digit'])} ref={num4}><TbNumber4 /></div>
                    <div className={clsx(styles['key'], styles['digit'])} ref={num5}><TbNumber5 /></div>
                    <div className={clsx(styles['key'], styles['digit'])} ref={num6}><TbNumber6 /></div>
                    <div className={clsx(styles['key'], styles['operator'])} ref={minus}><FaMinus /></div>
                    <div className={clsx(styles['key'], styles['digit'])} ref={num1}><TbNumber1 /></div>
                    <div className={clsx(styles['key'], styles['digit'])} ref={num2}><TbNumber2 /></div>
                    <div className={clsx(styles['key'], styles['digit'])} ref={num3}><TbNumber3 /></div>
                    <div className={clsx(styles['key'], styles['operator'])} ref={plus}><FaPlus /></div>
                    <div className={clsx(styles['key'], styles['plus-minus'])}><TbPlusMinus /></div>
                    <div className={clsx(styles['key'], styles['digit'])} ref={num0}><TbNumber0 /></div>
                    <div className={clsx(styles['key'], styles['dot'])} ref={dot}><BsDot/></div>
                    <div className={clsx(styles['key'], styles['equal'])} ref={equal}><FaEquals /></div>
                </main>
            </div>
        </div>
    );
}

export default App;
