const toDoList = {
    _notes: [],
    _texts: [],

    _findId(id) {
        return this._notes.findIndex((note) => note.id === id );
    },

    _isUnique(text) {
        return this._texts.includes(text);
    },

    newNote(text) {
        const unique = this._isUnique(text);
        if (!unique) {
            const note = {
                id: Date.now(),
                text,
                isTaskComplete: false
            };
            this._notes.push(note);
            this._texts.push(note.text);
        }
    },

    removeNote(id, confirm = false) {
        const index = this._findId(id);
        if (index >= 0 && confirm) {
            this._notes.splice(index, 1);
        }
    },

    updateNote(id, text, confirm = false) {
        const unique = this._isUnique(text);
        if (!unique) {
            const index = this._findId(id);
            if (index >= 0 && text && confirm) {
                this._notes[index].text = text;
            }
        }
    },

    completeTask(id) {
        const index = this._findId(id);
        if (index >= 0) {
            this._notes[index].isTaskComplete = true;
        }
    },

    getStat() {
        return this._notes.reduce( (acc, note) => {
            if (acc[note.isTaskComplete]) {
                ++acc.completed;
            } else {
                ++acc.uncompleted;
            }
            return acc;
        }, {
            completed: 0,
            uncompleted: 0
        } )
    }
};
//для проверки
toDoList.newNote();
toDoList.updateNote();
toDoList.completeTask();
toDoList.removeNote();
toDoList.getStat();