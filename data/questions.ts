
import { Question } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "¿En general, qué tan satisfecho(a) quedaste con el show de drones?",
    type: 'rating',
    options: [
      { label: 'Muy satisfecho', value: 5, emoji: '😍' },
      { label: 'Satisfecho', value: 4, emoji: '😊' },
      { label: 'Neutral', value: 3, emoji: '😐' },
      { label: 'Poco satisfecho', value: 2, emoji: '😕' },
      { label: 'Nada satisfecho', value: 1, emoji: '😞' },
    ]
  },
  {
    id: 2,
    text: "¿Cómo calificarías el diseño visual del show?",
    type: 'rating',
    options: [
      { label: 'Excelente', value: 5, emoji: '⭐⭐⭐⭐⭐' },
      { label: 'Bueno', value: 4, emoji: '⭐⭐⭐⭐' },
      { label: 'Regular', value: 3, emoji: '⭐⭐⭐' },
      { label: 'Malo', value: 2, emoji: '⭐⭐' },
    ]
  },
  {
    id: 3,
    text: "El show fue más allá de tus expectativas",
    type: 'agreement',
    options: [
      { label: 'Totalmente de acuerdo', value: 5, emoji: '✅' },
      { label: 'De acuerdo', value: 4, emoji: '👍' },
      { label: 'Ni de acuerdo ni en desacuerdo', value: 3, emoji: '🤷' },
      { label: 'En desacuerdo', value: 2, emoji: '👎' },
    ]
  },
  {
    id: 4,
    text: "¿Cómo calificarías la coordinación y ejecución del show?",
    type: 'rating',
    options: [
      { label: 'Excelente', value: 5, emoji: '🎯' },
      { label: 'Buena', value: 4, emoji: '✨' },
      { label: 'Regular', value: 3, emoji: '📊' },
      { label: 'Mala', value: 2, emoji: '⚠️' },
    ]
  },
  {
    id: 5,
    text: "¿Cómo fue tu experiencia con nuestro equipo antes y durante el evento?",
    type: 'experience',
    options: [
      { label: 'Excelente atención', value: 5, emoji: '💎' },
      { label: 'Buena atención', value: 4, emoji: '👨‍💼' },
      { label: 'Regular', value: 3, emoji: '📞' },
      { label: 'Mala', value: 2, emoji: '😞' },
    ]
  },
  {
    id: 6,
    text: "¿Qué tan probable es que nos recomiendes a un colega o contacto?",
    type: 'nps',
    options: [
      { label: 'Muy probable', value: 5, emoji: '🌟' },
      { label: 'Probable', value: 4, emoji: '👌' },
      { label: 'Poco probable', value: 3, emoji: '🤔' },
      { label: 'Nada probable', value: 2, emoji: '❌' },
    ]
  },
  {
    id: 7,
    text: "Ayúdanos a mejorar, ¿Qué podríamos hacer mejor en futuros shows?",
    type: 'open',
    placeholder: "Escribe tus comentarios aquí..."
  }
];
