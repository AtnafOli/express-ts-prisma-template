import { AdvancedResults } from "../interfaces"; 
declare global {
  namespace Express {
    interface Response {
      advancedResults?: AdvancedResults;
    }
  }
}
