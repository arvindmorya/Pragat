// process.env.NODE_ENV = 'test';
var Customuser = require('../../../../common/models/custom-user')
// // import {givenPersonData} from '../../helpers/database.helpers';
// import expect = require('@loopback/testlab');
// import assert = require('assert');
// import mocha = require('mocha');
var server = require('../../../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('Customuser (unit)', () => {
  describe('save encrypted password', () => {
    it('encrypts the given password', () => {
        // let ds = app.datasources.postgres;
        // console.log("*******ds" + ds); 
        console.log("******"+process.env.NODE_ENV);
        let user = {
            "name": "Patil Sushma",
            "udise_id": "87654321",
            "phone_number": "9876543211",
            "school_id": 1,
            "kp_id": 1,
            "email": "patilsushma@gmail.com",
            "password": "patilsushma"
        }
        chai.request(server)
            .post('/api/kp')
            .send(user)
            .end((err: Error, res: any) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            });
        });
        // fetchUserFromDb()
        // const password = user.getFullName();
//       expect(fullName).to.equal('Jane Smith Brown');
//     });
    })
});

//       const fullName = person.getFullName();
//       expect(fullName).to.equal('Jane Smith Brown');
//     });

//     it('omits middlename when not present', () => {
//       const person = givenPerson({
//         firstname: 'Mark',
//         surname: 'Twain',
//       });

//       const fullName = person.getFullName();
//       expect(fullName).to.equal('Mark Twain');
//     });
//   });

//   function givenPerson(data: Partial<Person>) {
//     return new Person(givenPersonData(data));
//   }
// });

function fetchUserFromDb(id:any){
    Customuser.findById(id, (err:Error, user: any) => {
        if(err)
            console.log("Error: ", err)
        //If no errors, send it back to the client
       return user;
    });
}