import session from 'express-session';
import passport from 'passport';
import secret from './config.js';
import initializePassport from './passport.js';

export default function configurePassport(app) {
    app.use(session({
        secret: secret,
        resave: false,
        saveUninitialized: false,
    }));
    
    app.use(passport.initialize()) // инициализируем библиотеку passport
    app.use(passport.session()) // говорим, что будем использовать сессии
    
    initializePassport(passport);
}