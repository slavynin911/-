import React, { Component } from "react";
import EggsNone from "../eggs";
import "../eggsActions/eggsActions.css";


export default class EggsActions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posLU: true,
            posLD: true,
            posRU: true,
            posRD: true,
            posLU1: true,
            posLD1: true,
            posRU1: true,
            posRD1: true,
            LU: 'egg LU1 noneEgg ',
            LD: 'egg LD1 noneEgg',
            RU: 'egg RU1 noneEgg',
            RD: 'egg RD1 noneEgg',
            LU1: 'egg LU1 noneEgg',
            LD1: 'egg LD1 noneEgg',
            RU1: 'egg RU1 noneEgg',
            RD1: 'egg RD1 noneEgg',
            speedEgg: 5000,
            respaunEgg: 5000,
            num: "volk1 active", numh: "volk-hand2 active",
            score: 0,
            mistakes: 0,
            loss: 0


        };
        this.start1 = this.start1.bind(this);
        // this.start11 = this.start11.bind(this);
        this.beginA = this.beginA.bind(this);
        this.beginB = this.beginB.bind(this);
        this.auto = this.auto.bind(this);
        this.renderWolf = this.renderWolf.bind(this);
        this.checkPos = this.checkPos.bind(this);
        this.loss = this.loss.bind(this);

    }

    /////////////////////////////////////////////
    componentDidMount() {
        document.addEventListener("keydown", this.checkKey);

    }



    componentDidUpdate() {
        if (this.state.loss === 99) {
            setTimeout(() => this.setState({ loss: 0 }), 4000);
        }

    }

    //////////////////////////////////////////////////////
    ///////Проверка свободной позиции для рендеринга яйца
    checkPos() {
        if (this.state.posLU === true || this.state.posLU1 === true) {
            this.start1("LU", "posLU")
        } else
        if (this.state.posLD === true || this.state.posLD1 === true) {
            this.start1("LD", "posLD")
        } else
        if (this.state.posRU === true || this.state.posRU1 === true) {
            this.start1("RU", "posRU")
        } else
        if (this.state.posRD === true || this.state.posRD1 === true) {
            this.start1("RD", "posRD")
        }
    }

    /////////////////////////////////////////////////
    //Функция рендера случайного яйца 
    auto() {
        let num = this.randomInteger(1, 4);

        switch (num) {
            case 1:
                if (this.state.posLU === true || this.state.posLU1 === true) {
                    this.start1("LU", "posLU")
                } else
                    
                        if (this.state.posLU === false && this.state.posLU1 === false) {
                            this.checkPos()
                        }
                break;
            case 2:
                if (this.state.posLD === true || this.state.posLD1 === true) {
                    this.start1("LD", "posLD")
                } else
                   
                        if (this.state.posLD === false && this.state.posLD1 === false) {
                            this.checkPos()
                        }
                break;
            case 3:
                if (this.state.posRU === true || this.state.posRU1 === true) {
                    this.start1("RU", "posRU")
                } else
                    
                        if (this.state.posRU === false && this.state.posRU1 === false) {
                            this.checkPos()
                        }
                break;
            case 4:
                if (this.state.posRD === true || this.state.posRD1 === true) {
                    this.start1("RD", "posRD")
                } else
                   
                        if (this.state.posRD === false && this.state.posRD1 === false) {
                            this.checkPos()
                        }
                break;
            default:
                break;
        }
    }

    /////////////////////////////////////////////
    ///Функция генерации яиц с определенным интервалом

    beginA() {
        if (this.state.loss === 99) {
            this.setState({ loss: 0 })

        }

        this.state.speedEgg = 1000;
        this.state.respaunEgg = 1000;





        let timerB = setInterval(() => {
            this.auto()
            if (this.state.loss === 99) {
                clearInterval(timerB)
            }

        }, this.state.respaunEgg)
    }



    beginB() {
        if (this.state.loss === 99) {
            this.setState({ loss: 0 })

        }

        this.state.speedEgg = 100;
        this.state.respaunEgg =100;





        let timerB = setInterval(() => {
            this.auto()
            if (this.state.loss === 99) {
                clearInterval(timerB)
            }

        }, this.state.respaunEgg)



    }

    ///////////////////////////////////////////
    //Функция генерации рандомного числа
    randomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    //////////////////////////////////////////
    //Функции движения яиц

    start1(i, pos) {

        let x = i;
        let y = pos;

        let pos1=y
        let pos2=y+1
        console.log(pos2)
        if (this.state[pos1] === false && this.state[pos2] === true) {
            
            x +=  1;
            y +=  1;
           
        }
        console.log(x, y)
        this.setState({ [x]: `egg ${i}1 activeEgg` })
        this.setState({ [y]: false })
        setTimeout(() => this.setState({ [x]: `egg ${i}2 activeEgg` }), this.state.speedEgg)
        setTimeout(() => this.setState({ [x]: `egg ${i}3 activeEgg` }), this.state.speedEgg * 2)
        setTimeout(() => this.setState({ [x]: `egg ${i}4 activeEgg` }), this.state.speedEgg * 3)
        setTimeout(() => this.setState({ [x]: `egg ${i}5 activeEgg` }), this.state.speedEgg * 4)
        setTimeout(() => verify(), this.state.speedEgg * 4.1)
        setTimeout(() => this.setState({ [x]: `egg ${i}1 noneEgg` }), this.state.speedEgg * 4.5)
        setTimeout(() => this.setState({ [y]: true }), this.state.speedEgg * 4.5)

        const verify = () => {
            if (this.state[x] === `egg ${i}5 activeEgg`) {
                if ((x === "LU" && this.state.numh === "volk-hand2 active")||(x === "LU1" && this.state.numh === "volk-hand2 active")) {
                    this.setState({ score: this.state.score + 1 })
                } else
                    if ((x === "LD" && this.state.numh === "volk-hand1 active")||(x === "LD1" && this.state.numh === "volk-hand1 active")) {
                        this.setState({ score: this.state.score + 1 })
                    } else
                        if ((x === "RU" && this.state.numh === "volk-hand4 active")||(x === "RU1" && this.state.numh === "volk-hand4 active")) {
                            this.setState({ score: this.state.score + 1 })
                        } else
                            if ((x === "RD" && this.state.numh === "volk-hand3 active")||(x === "RD1" && this.state.numh === "volk-hand3 active")) {
                                this.setState({ score: this.state.score + 1 })
                            } else {
                                this.loser()
                                this.setState({ mistakes: this.state.mistakes + 1 })
                            }
            }
        }
    }


    loser() {
        if (this.state.loss !== 99) {
            this.setState({ loss: this.state.loss + 33 })
        }
        // else{
        // this.state.LU = 'egg LU1 noneEgg ';
        // this.state.LD = 'egg LD1 noneEgg ';
        // this.state.RU = 'egg RU1 noneEgg ';
        // this.state.RD = 'egg RD1 noneEgg ';
        // this.state.LU1 = 'egg LU1 noneEgg ';
        // this.state.LD1 = 'egg LD1 noneEgg ';
        // this.state.RU1 = 'egg RU1 noneEgg ';
        // this.state.RD1 = 'egg RD1 noneEgg ';}

    }




    loss(x) {
        let config = {
            width: x,
        }

        return (
            <div className="loss" style={config} />
        )
    }









    ///////////////////////////// 
    //Использование клавиатуры (кнопки 2,4,6,8 на numpad)
    checkKey = (event) => {
        switch (event.keyCode) {
            case 65:
                this.setState({ num: "volk1 active" });
                this.left()
                break;
            case 68:
                this.setState({ num: "volk2 active" });
                this.right()
                break;
            case 87:
                this.up()
                break;
            case 83:
                this.down()
                break;
            default:
                break;
        }

    }

    left() {
        if (this.state.numh === "volk-hand4 active") {
            this.setState({ numh: "volk-hand2 active" });
        }
        if (this.state.numh === "volk-hand3 active") {
            this.setState({ numh: "volk-hand1 active" });
        }

    }

    right() {
        if (this.state.numh === "volk-hand1 active") {
            this.setState({ numh: "volk-hand3 active" });
        }
        if (this.state.numh === "volk-hand2 active") {
            this.setState({ numh: "volk-hand4 active" });
        }

    }

    up() {
        if (this.state.num === "volk1 active") {
            this.setState({ numh: "volk-hand2 active" });
        }
        if (this.state.num === "volk2 active") {
            this.setState({ numh: "volk-hand4 active" });
        }
    }

    down() {
        if (this.state.num === "volk1 active") {
            this.setState({ numh: "volk-hand1 active" });
        }
        if (this.state.num === "volk2 active") {
            this.setState({ numh: "volk-hand3 active" });
        }
    }



    ///////////////////////////
    //Функция рендера волка при клике на кнопки интерфейса
    renderWolf(i) {
        switch (i.target.id) {
            case "1":
                this.setState({ num: "volk1 active" });
                this.setState({ numh: "volk-hand2 active" });
                break;
            case "2":
                this.setState({ num: "volk1 active" });
                this.setState({ numh: "volk-hand1 active" });
                break;
            case "3":
                this.setState({ num: "volk2 active" });
                this.setState({ numh: "volk-hand4 active" });
                break;
            case "4":
                this.setState({ num: "volk2 active" });
                this.setState({ numh: "volk-hand3 active" });
                break;
            default:
                break;
        }

    }

    render() {

        let classname1 = this.state.LU;
        let classname2 = this.state.LD;
        let classname3 = this.state.RU;
        let classname4 = this.state.RD;

        let classname11 = this.state.LU1;
        let classname22 = this.state.LD1;
        let classname33 = this.state.RU1;
        let classname44 = this.state.RD1;

        let num = this.state.num;
        let numh = this.state.numh;
        let wolk = <div className={num} />;
        let wolkHand = <div className={numh} />

        let score = this.state.score;
        let mistakes = this.state.mistakes;

        return (
            <>
                <div className="wraper">
                    <div className="btn_startA" onClick={this.beginA} />
                    <div className="title_btn_startA">игра А</div>
                    <div className="btn_startB" onClick={this.beginB} />
                    <div className="title_btn_startB">игра Б</div>
                    <div className={classname1} />
                    <div className={classname2} />
                    <div className={classname3} />
                    <div className={classname4} />
                    <div className={classname11} />
                    <div className={classname22} />
                    <div className={classname33} />
                    <div className={classname44} />

                    <div className="score">
                        {score}
                    </div>

                    <div className="mistakes">
                        {mistakes}
                    </div>



                    {this.loss(this.state.loss)}
                    <EggsNone />
                    {wolk}
                    {wolkHand}

                    <button id="1" onClick={this.renderWolf} className="btn btn-left-up" />
                    <button id="2" onClick={this.renderWolf} className="btn btn-left-down" />
                    <button id="3" onClick={this.renderWolf} className="btn btn-right-up" />
                    <button id="4" onClick={this.renderWolf} className="btn btn-right-down" />
                </div>
            </>
        )
    }
}











































// if (this.state.posLU === true ) {
        //     this.start1("LU", "posLU")
        // } else
        //     if (this.state.posLU1 === true) {
        //         this.start11("LU", "posLU")
        //     } else
        //         if (this.state.posLD === true) {
        //             this.start1("LD", "posLD")
        //         } else
        //             if (this.state.posLD1 === true) {
        //                 this.start11("LD", "posLD")
        //             } else
        //                 if (this.state.posRU === true) {
        //                     this.start1("RU", "posRU")
        //                 } else
        //                     if (this.state.posRU1 === true) {
        //                         this.start11("RU", "posRU")
        //                     } else
        //                         if (this.state.posRD === true) {
        //                             this.start1("RD", "posRD")
        //                         } else
        //                             if (this.state.posRD1 === true) {
        //                                 this.start11("RD", "posRD")
        //                             }




















        // start11(i, pos) {

    //     let x = i + 1;
    //     let y = pos + 1;


    //     this.setState({ [x]: `egg ${i}1 activeEgg` })
    //     this.setState({ [y]: false })
    //     setTimeout(() => this.setState({ [x]: `egg ${i}2 activeEgg` }), this.state.speedEgg)
    //     setTimeout(() => this.setState({ [x]: `egg ${i}3 activeEgg` }), this.state.speedEgg * 2)
    //     setTimeout(() => this.setState({ [x]: `egg ${i}4 activeEgg` }), this.state.speedEgg * 3)
    //     setTimeout(() => this.setState({ [x]: `egg ${i}5 activeEgg` }), this.state.speedEgg * 4)
    //     const verify = () => {

    //         if (this.state[x] === `egg ${i}5 activeEgg`) {

    //             if (x === "LU1" && this.state.numh === "volk-hand2 active") {
    //                 this.setState({ score: this.state.score + 1 })
    //             } else
    //                 if (x === "LD1" && this.state.numh === "volk-hand1 active") {
    //                     this.setState({ score: this.state.score + 1 })
    //                 } else
    //                     if (x === "RU1" && this.state.numh === "volk-hand4 active") {
    //                         this.setState({ score: this.state.score + 1 })
    //                     } else
    //                         if (x === "RD1" && this.state.numh === "volk-hand3 active") {
    //                             this.setState({ score: this.state.score + 1 })
    //                         } else {
    //                             this.loser()
    //                             this.setState({ mistakes: this.state.mistakes + 1 })
    //                         }
    //         }
    //     }
    //     setTimeout(() => verify(), this.state.speedEgg * 4.1)
    //     setTimeout(() => this.setState({ [x]: `egg ${i}1 noneEgg` }), this.state.speedEgg * 4.5)
    //     setTimeout(() => this.setState({ [y]: true }), this.state.speedEgg * 4.5)
    // }