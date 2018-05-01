Template.dot.events ({
    "mousedown div" (evt, tmpl) {
        Dot.update({_id: this._id}, {$set: {color: "black"}})
    }
});