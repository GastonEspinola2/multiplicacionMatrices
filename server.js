// Importando dependencias
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Middleware para parsear el cuerpo de las solicitudes (POST)
app.use(bodyParser.json());

// Función para multiplicar matrices
const multiplyMatrices = (matrix1, matrix2) => {
    const rowsMatrix1 = matrix1.length;
    const colsMatrix1 = matrix1[0].length;
    const rowsMatrix2 = matrix2.length;
    const colsMatrix2 = matrix2[0].length;

    if (colsMatrix1 !== rowsMatrix2) {
        throw new Error("Las matrices no se pueden multiplicar.");
    }

    // Resultado de la multiplicación
    const result = new Array(rowsMatrix1).fill().map(() => new Array(colsMatrix2).fill(0));

    for (let i = 0; i < rowsMatrix1; i++) {
        for (let j = 0; j < colsMatrix2; j++) {
            for (let k = 0; k < colsMatrix1; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return result;
};

// Ruta para multiplicar matrices
app.post('/multiply', (req, res) => {
    try {
        const { matrix1, matrix2 } = req.body;
        const result = multiplyMatrices(matrix1, matrix2);
        res.json({ success: true, result });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
