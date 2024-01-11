const User = require("../models/User");

const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }

  static register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    // password match validation

    if (password != confirmPassword) {
      req.flash("message", "As senhas não conferem. Tente Novamente!");
      res.render("auth/register");
      return;
    }

    //Check if user exists

    const checkIfUserExists = await User.findOne({ where: { email: email } });

    if (checkIfUserExists) {
      req.flash("message", "O email já está em uso");
      res.render("auth/register");
      return;

    } 

    // Create a password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    //Create User

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createdUser = await User.create(user);

      //initialize session

      req.session.userid = createdUser.id;

      req.flash("message", "Cadastro realizado com sucesso!");

      req.session.save(() => {
        res.redirect("/");
      });
    } catch (err) {
      console.log(err);
    }
  }

  static logout (req,res){

req.session.destroy()
res.redirect('/login')

  }

  static  async loginPost(req,res){

const {email,password} = req.body

//Find User

const user = await User.findOne({where: {email:email}})

if(!user){

req.flash("message", "Usuário ainda não cadastrado!");
res.render('auth/login')
return
} 



//Check if password match


const passwordMatch = bcrypt.compareSync(password, user.password)


if(!passwordMatch){

    req.flash("message", "Senha inválida!");
    res.render('auth/login')
    return

}

    //initialize session

    req.session.userid = user.id;

    req.flash("message", "Autenticação realizada com sucesso!");

    req.session.save(() => {
      res.redirect("/");
    });
  } catch (err) {
    console.log(err);
  }

  }

