const Pool = require('pg').Pool
const pool = new Pool({
  user: 'vevink',
  host: 'dev.vk.edu.ee',
  database: 'db_vinkler',
  password: 't232498',
  port: 5432,
})
//Filmide küsimine
const getFilm = (request, response) => {
  pool.query('SELECT * FROM movies.film ORDER BY film_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
} //Filmi küsimine id järgi
const getFilmById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM movies.film WHERE film_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//Näitlejate küsimine
const getActor = (request, response) => {
    pool.query('SELECT * FROM movies.actor ORDER BY actor_id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
} //Näitlejate küsimine id järgi
const getActorById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM movies.actor WHERE actor_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
//Kategooria küsimine
const getCategory = (request, response) => {
    pool.query('SELECT * FROM movies.category ORDER BY category_id ASC', (error, results) => {
      if (error) {
        throw error
      }
    response.status(200).json(results.rows)
    })
} //Kategooria küsimine id järgi
const getCategoryById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM movies.category WHERE category_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//Keele küsimine
const getLanguage = (request, response) => {
    pool.query('SELECT * FROM movies.language ORDER BY language.id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
} //Keele küsimine id järgi
const getLanguageById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM movies.language WHERE language_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getFilm,
  getFilmById,
  getActor,
  getActorById,
  getCategory,
  getCategoryById,
  getLanguage,
  getLanguageById
}