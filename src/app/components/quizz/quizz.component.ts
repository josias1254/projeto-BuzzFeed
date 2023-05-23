import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json";
import { __values } from 'tslib';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title:string = "";

  questions:any
  questionSelected:any
quizSelected:any
  answers:string[] = [];
  answerSelected:string = "";
  descriptionSelected:string = "";

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

 volta = this.answers.length > 0 ? true : false
  finished:boolean = false


  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
this.quizSelected = quizz_questions.quizzes[0]

      this.finished = false;
      this.title = this.quizSelected.title

      this.questions = this.quizSelected.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
      this.volta = false;




        }
  }

opcaoEscolhida(val:string){
  this.answers.push(val)
  this.nextStep();
  this.volta = true;
}

async nextStep(){
this.questionIndex+=1;

if(this.questionMaxIndex > this.questionIndex){
  this.questionSelected = this.questions[this.questionIndex]
}else{
  const finalAnswer:string = await this.CheckResult(this.answers)
  this.volta = false;
  this.finished = true;
  this.answerSelected = this.quizSelected.results[finalAnswer as keyof typeof this.quizSelected.results].resposta
  this.descriptionSelected = this.quizSelected.results[finalAnswer as keyof typeof this.quizSelected.results].descricao
}
}

  async CheckResult(answers:string[]){
    const result = answers.map(a=>a.split('')).reduce((a,b) => a.concat(b)).reduce((previous, current, i, arr)=>{
      if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
      ){
        return previous
      }else{
        return current
      }
    })
    return result
  }

  voltar(){
    this.answers.pop();
    this.questionIndex-=1;
    this.questionSelected = this.questions[this.questionIndex]
    this.volta = this.answers.length > 0 ? true : false
    console.log(this.answers);


  }

  reset(){
    this.finished = false;
    this.title = this.quizSelected.title

    this.questionIndex = 0

    this.questions = this.quizSelected.questions
    this.questionSelected = this.questions[this.questionIndex]

    this.questionMaxIndex = this.questions.length
    this.volta = false;
    this.answers = [];
    this.answerSelected = "";
  }

  mudar(i:number){
    this.quizSelected = quizz_questions.quizzes[i]
    this.finished = false;
    this.title = this.quizSelected.title

    this.questionIndex = 0

    this.questions = this.quizSelected.questions
    this.questionSelected = this.questions[this.questionIndex]

    this.questionMaxIndex = this.questions.length
    this.volta = false;
  }
}
