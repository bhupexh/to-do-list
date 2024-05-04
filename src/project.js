import { differenceInDays, parseISO } from "date-fns";

function createProjectObject(){
  return {
    toDo: [],
    setItem : function (title, description, due, priority){
      // due = differenceInDays(parseISO(due), new Date());
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
      if (index >= 0 && index < this.toDo.length) {
        return this.toDo[index];
      } else {
        return null; 
      }
    },
    removeItem: function(index){
      if (index >= 0 && index < this.toDo.length) {
        this.toDo.splice(index, 1);
        localStorage.setItem('project', this.toJSON()); 
        console.log(this.toDo);
      }
    },
    updateItem: function(id, field, value){
      this.getItem(id)[field] = value;
      localStorage.setItem('project', this.toJSON()); 
    },
    toJSON: function() {;
      return JSON.stringify(this.toDo);
    }
  }
}

export default createProjectObject;