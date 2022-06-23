import { Router } from 'express';
import {
  Controller, Route, Get, Tags, 
} from 'tsoa';

@Route('HelloWorld') // route name => localhost:xxx/helloWorld
@Tags('HelloWorldController') // => Under HelloWorldController tag    
export default class HelloWorldController extends Controller {
  public path = '/';

  public router = Router();
  
  @Get()  //specify the request type
  hello(): HelloWorldInterface {    
     return {message: 'Hello World!'};  
  }
}
export interface HelloWorldInterface {  message: string;}