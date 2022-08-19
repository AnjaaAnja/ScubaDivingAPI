import express, { Application, Request, response, Response, Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { Connection, FilterQuery } from 'mongoose'
import { request } from 'http';
import users from './model/user';
import organizations from './model/organization';
import programs from './model/program';
import comments from './model/comment';
import reservations from './model/reservation'

const app: Application = express();


// CORS
//app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
  });
// PARSIRANJE HTTP PAKETA U JSON FORMATU
app.use(bodyParser.json());


// KONEKTOVANJE NA BAZU
mongoose.connect("mongodb+srv://Anja:MongoDBAnja@cluster0.cspbh.mongodb.net/?retryWrites=true&w=majority");

const conn: Connection = mongoose.connection;
const router: Router = express.Router();


conn.once('open', () => {
    console.log('Succesfully conected to database');
});


router.route('/login').post((request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    console.log(username, password);
    users.findOne({ "username": username, "password": password }, '', (err, user) => {
        if (err) return 'error';


        // UKOLIKO NE POSTOJI KORISNIK VRACAMO KORISNIKU PORUKU O LOSEM LOGOVANJU
        if (!user) {
            response.status(500).json('Invalid login');
        } else {
            response.status(200).json(user);
        }
    })
});


router.route('/register').post((request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    const sname = request.body.password;
    const lname = request.body.password;
    const email = request.body.password;
    const age = request.body.password;
    const experience = request.body.password;

    users.findOne({ "username": username }, '', (err, user) => {
        if (!!user) {
            response.status(500).json('Username taken');
        } else {
            users.insertMany([{ "username": username, "password": password }], (err, user) => {
                if (err) {
                    response.status(500).json(user);
                }
                else {
                    response.status(200).json(user);
                }
            })
        }
    });
});

router.route('/pokreni').get((request, response) => {
    users.find({}, '', (err, users) => {
        if (err) return 'error';

        response.json(users);
        // 'athletes' contains the list of athletes that match the criteria.
    })
});

router.route('/organizationsAll').get((request, response) => {
    organizations.find({}, '', (err, organizations) => {
        if (err) return 'error';

        response.json(organizations);
    });
});

router.route('/allProgramsForOrganization').get((request, response) => {

    let _id: string = String(request.query._id);
    console.log(_id);
    const regexp = new RegExp('^[0-9a-fA-F]{24}$');
    const test = regexp.test(_id);
    if (!test) {
        response.status(400).json('_id not valid');
    } else {
        programs.find({ "organizationID": _id }, '', (err, programs) => {
            if (err) return 'error';
            
            response.json(programs);
        });
    }

});

router.route('/getOrganization').get((request, response) => {

    let _id: string = String(request.query._id);
    console.log(_id);
    const regexp = new RegExp('^[0-9a-fA-F]{24}$');
    const test = regexp.test(_id);
    if (!test) {
        response.status(400).json('_id not valid');
    } else {
        organizations.find({ "_id": _id }, '', (err, programs) => {
            if (err) return 'error';
            
            response.json(programs);
        });
    }

});

router.route('/allCommentsForOrganization').get((request, response) => {

    let _id: string = String(request.query._id);
    console.log(_id);
    const regexp = new RegExp('^[0-9a-fA-F]{24}$');
    const test = regexp.test(_id);
    if (!test) {
        response.status(400).json('_id not valid');
    } else {
        comments.find({ "organizationID": _id }, '', (err, comments) => {
            if (err) return 'error';
            comments.forEach((com) => {

            })
            response.json(comments);
        }).populate('user');
    }

});

router.route('/addComment').post((request, response) => {

    let comment = request.body.comment
    console.log(comment);

    comments.insertMany([{organizationID: comment.organizationID, text: comment.text,user: comment.user._id}], (err, comment) => {
        if (err) {
            response.status(500).json(comment);
        }
        else {
            response.status(200).json(comment);
        }
    });

});

router.route('/removeComment').post((request, response) => {

    let commentId = request.body.commentID;

    comments.findOneAndDelete({_id: commentId}, null, (err, comment) => {
        if (err) {
            response.status(500).json(comment);
        }
        else {
            response.status(200).json(comment);
        }
    });

});

router.route('/addReservation').post((request, response) => {

    let reservation = request.body.reservation;
    console.log(reservation);

    reservations.insertMany([{userID: reservation.userID, organizationID: reservation.organizationID, date: reservation.date, programID: reservation.programID}], (err, reservation) => {
        if (err) {
            response.status(500).json(reservation);
        }
        else {
            response.status(200).json(reservation);
        }
    });

});

app.use('/', router);
app.listen(5000, () => console.log('Server running'))

