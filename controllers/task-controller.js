const Task = require('../models/Task');

module.exports = {
  getIndex: function (req, res) {
    // TODO: get all open, inProgress and finished tasks, pass them to the index view and render it
    Task.find()
      .then(tasks => {
        res.render('index', {
          'openTasks': tasks.filter(task => task.status === "Open"),
          'inProgressTasks': tasks.filter(task => task.status === "In Progress"),
          'finishedTasks': tasks.filter(task => task.status === "Finished")
        });
      });
  },
  getCreate: function (req, res) {
    // TODO: render the create view
    res.render('create');
  },
  postCreate: function (req, res) {
    // TODO: create new task and redirect to the index view
    Task.create(req.body)
      .then(() => res.redirect('/'))
      .catch(() => res.redirect('create'));
  },
  getEdit: function (req, res) {
    // TODO: get the task for editing, pass it to the edit view and render it
    Task.findById(req.params.id)
        .then(tasks => res.render('edit', { 
            task: {
              _id: req.params.id,
              title: tasks.title,
              open: tasks.status === 'Open',
              inProgress: tasks.status === 'In Progress',
              finished: tasks.status === 'Finished'
            }
          })
        );
  },
  postEdit: function (req, res) {
    // TODO: update the task and redirect to index view
    
    Task.findByIdAndUpdate(req.params.id, req.body)
      .then(() => res.redirect('/'));
  },
  getDelete: function (req, res) {
     // TODO: get the task for deleting, pass it to the detele view and render it
    
    Task.findById(req.params.id)
      .then((task) => res.render('delete', {task}));
  },
  postDelete: function (req, res) {
    // TODO: delete the task and redirect to the index view
    
    Task.findByIdAndDelete(req.params.id, req.body)
      .then(() => res.redirect('/'));
    }
};