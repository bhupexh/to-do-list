import { differenceInDays, parseISO } from "date-fns";

function createProjectObject(){
  return {
    toDo: [],
    setItem : function (title, description, due, priority){
      due = differenceInDays(parseISO(due), new Date());
      this.toDo.push({ 
        id: this.toDo.length + 1,
        title,
        description,
        due,
        priority
      });
      return this.toDo.length;
    },
    getItem: function(index){
      if (index >= 0 && index < this.todos.length) {
        return this.todos[index];
      } else {
        return null; 
      }
    },
    removeItem: function(index){
      if (index >= 0 && index < this.toDo.length) {
        this.toDo.splice(index, 1);
      }
    },
    toJSON: function() {;
      return JSON.stringify(this.toDo);
    }
  }
}

export default createProjectObject;