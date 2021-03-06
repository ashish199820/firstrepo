var express = require('express');
const app = express();
var router = express.Router();


const Student = require('../models/student');

/* GET users listing. */
router.get('/',function(req, res){
  Student.find({}).populate('college_id','name')
  .exec(function (err,student) {
    if(err) throw err;
   //var name1=student.name;
   //var email = student.email;
   //var reg_no1=student.reg_no;
  // var id = student.college_id.name;
 //var st={
    //name:name1,
   //
   // college_id:id

 /// }
    res.json(student);
  });
});

router.get('/:id',function(req, res){
  Student.findOne({_id:req.params.id},function (err,student) {
    if(err) throw err;
    student.name+="weer";
    res.json(student);
  });
});


router.post('/',function(req,res){
    console.log(req.body);
  const student = new Student({
    name : req.body.name,
    email : req.body.email,
    reg_no : req.body.reg_no,
    college_id : req.body.college_id

  });
  student.save().then(function(){
      res.json(student);
  });
 
});

router.delete('/:id',function(req,res){

    Student.findOneAndDelete(
        {_id:req.params.id},function(err,student) {
        if(err) throw err;
        res.end("Deleted successfully");
      });
});

module.exports = router;