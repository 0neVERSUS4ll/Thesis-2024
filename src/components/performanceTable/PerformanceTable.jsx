import React, { useState, useEffect, useContext } from 'react';
import { getFirestore, collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import './performanceTable.scss';

const QuizPerformance = () => {
  const [networkSecurityPerformance, setNetworkSecurityPerformance] = useState(null);
  const [topologyPerformance, setTopologyPerformance] = useState(null);

  const { currentUser } = useContext(AuthContext); 

  useEffect(() => {    
    const fetchQuizResults = async () => {
      const userId = currentUser.uid;
      const q = query(collection(db, 'quiz-results'), where('userId', '==', userId));
      const resultsSnapshot = await getDocs(q);      
      const results = resultsSnapshot.docs.map(doc => doc.data());      
      return results;
    };
  
    fetchQuizResults().then((results) => {
      let totalCorrectAnswers = 0;
      let totalQuestions = 0;

      const quizIds = [...new Set(results.map(result => result.quizId))]; 
    
      quizIds.forEach(quizId => {
        const quizResults = results.filter(result => result.quizId === quizId);
        const correctAnswers = quizResults.filter(result => result.firstAttemptCorrect).length;
        totalCorrectAnswers += correctAnswers;
        totalQuestions += quizResults.length;
      });

      const overallPerformance = (totalCorrectAnswers / totalQuestions) * 100;
    
      
      setNetworkSecurityPerformance(overallPerformance);
    });
  }, [currentUser]); 

  useEffect(() => {
    const fetchQuizResults = async () => {
      const userId = currentUser.uid; // use the uid of the current user
      const q = query(collection(db, 'topology-quiz-results'), where('userId', '==', userId));
      const resultsSnapshot = await getDocs(q);
      return resultsSnapshot.docs.map(doc => doc.data());
    };

    fetchQuizResults('topologyQuizId').then((results) => {
      let totalCorrectAnswers = 0;
      let totalQuestions = 0;

      const userIds = [...new Set(results.map(result => result.userId))]; 
    
      userIds.forEach(userId => {
        const userResults = results.filter(result => result.userId === userId);
        const correctAnswers = userResults.filter(result => result.firstAttemptCorrect).length;
        totalCorrectAnswers += correctAnswers;
        totalQuestions += userResults.length;
      });

      const overallPerformance = (totalCorrectAnswers / totalQuestions) * 100;
    
      
      setTopologyPerformance(overallPerformance);
    });
  }, []); 

  const resetQuizResults = async () => {
    const userId = currentUser.uid; // use the uid of the current user
    const q = query(collection(db, 'quiz-results'), where('userId', '==', userId));
    const resultsSnapshot = await getDocs(q);

    
    resultsSnapshot.docs.forEach(async (docSnapshot) => {
      const docRef = doc(db, 'quiz-results', docSnapshot.id);
      await deleteDoc(docRef);
    });

    
    setNetworkSecurityPerformance(null);
  };

  const resetTopologyQuizResults = async () => {
    const userId = currentUser.uid; // use the uid of the current user
    const q = query(collection(db, 'topology-quiz-results'), where('userId', '==', userId));
    const resultsSnapshot = await getDocs(q);

    
    resultsSnapshot.docs.forEach(async (docSnapshot) => {
      const docRef = doc(db, 'topology-quiz-results', docSnapshot.id);
      await deleteDoc(docRef);
    });

    
    setTopologyPerformance(null);
  };

  return (
    <div className="performance-table">
      <div className="performance-block">
        <h2>Network Security Quiz Performance</h2>
        {networkSecurityPerformance !== null && (
          <p className={networkSecurityPerformance > 50 ? 'high-performance' : 'low-performance'}>
            {networkSecurityPerformance.toFixed(2)}% correct
          </p>
        )}
        <button onClick={resetQuizResults}>Reset</button>
      </div>
      <div className="performance-block">
        <h2>Topology Quiz Performance</h2>
        {topologyPerformance !== null && (
          <p className={topologyPerformance > 50 ? 'high-performance' : 'low-performance'}>
            {topologyPerformance.toFixed(2)}% correct
          </p>
        )}
        <button onClick={resetTopologyQuizResults}>Reset</button>
      </div>
    </div>
  );
}

export default QuizPerformance;