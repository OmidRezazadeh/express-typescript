import express, { Router } from 'express';

const app = express();
const router = Router();


router.get('/',indexController.index)