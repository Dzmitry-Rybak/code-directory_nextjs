import pool from '../postgrespool.js';
import jwt from 'jsonwebtoken';
import secret from '../../config/config.js';

const gettingQuestions = async (req, res) => {
    let sqlQuery = `SELECT question, question_id, answer, example_path  FROM questions_${req.query.stack}_${req.query.language}`;
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, secret);
            
            const userId = decoded.user_id;
            sqlQuery += ` WHERE user_id IN (0, ${userId}) ORDER BY question_id `;
        } else {
            sqlQuery += ` WHERE user_id = 0`;
        }

        const client = await pool.connect();
        const result = await client.query(sqlQuery);
    
        client.release(); // Освобождаем клиента обратно в пул соединений
        return res.json({message: 'Data received successfully', data: result.rows}); // Отправляем результат в формате JSON
    } catch (err) {
        if(err.name === "TokenExpiredError") {
            return res.status(401).json({ message: 'Token expired' });
        } else {
            console.error(err);
            return res.status(500).send('Server error');
        }
        
    }
}

const postingNewQuestion = async (req, res) => {
    if (req.headers.authorization) {

        const token = await req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        
        const userId = decoded.user_id;
        try {
            const { question, answer, stack, language } = req.body;
            
            const query = `INSERT INTO questions_${stack.toLowerCase()}_${language.toLowerCase()} (user_id, question, answer, example_path) VALUES ($1, $2, $3, $4)`;
        
            const values = [userId, question, answer, 'not available'];
            
            const client = await pool.connect();
            await client.query(query, values);
            
            client.release();
            res.status(201).json({ message: 'Questions posted successfully', status: 201 });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    
}

const gettingAnswer = async (req, res) => {
    let sqlQuery = `SELECT question, answer, example_path FROM questions_${req.query.stack}_${req.query.language} WHERE question_id = ${req.query.id}`;
    const client = await pool.connect();
    const result = await client.query(sqlQuery);

    // теперь при 404 нельзя вернутся назад, можно подумать как обработать подругому
    // if(result.rows.length === 0) {
    //     return res.status(404).json({error: 'Not Found'})
    // }
    
    client.release(); // Освобождаем клиента обратно в пул соединений
    return res.json({message: 'Answer received successfully', data: result.rows}); // Отправляем результат в формате JSON
}

export {gettingQuestions, postingNewQuestion, gettingAnswer}