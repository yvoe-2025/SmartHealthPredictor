import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// DOM Elements
const symptomInput = document.getElementById('symptomInput');
const symptomTags = document.getElementById('symptomTags');
const predictBtn = document.getElementById('predictBtn');

// Symptom Array
let symptoms = [];

// Event Listeners
if (symptomInput) {
    symptomInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && symptomInput.value.trim() !== '') {
            addSymptom(symptomInput.value.trim());
            symptomInput.value = '';
        }
    });
}

if (predictBtn) {
    predictBtn.addEventListener('click', predictDiseases);
}

// Functions
function addSymptom(symptom) {
    if (!symptoms.includes(symptom)) {
        symptoms.push(symptom);
        renderSymptoms();
        updatePredictButton();
    }
}

function removeSymptom(index) {
    symptoms.splice(index, 1);
    renderSymptoms();
    updatePredictButton();
}

function renderSymptoms() {
    symptomTags.innerHTML = '';
    symptoms.forEach((symptom, index) => {
        const tag = document.createElement('div');
        tag.className = 'symptom-tag';
        tag.innerHTML = `
            ${symptom}
            <button onclick="window.removeSymptom(${index})">×</button>
        `;
        symptomTags.appendChild(tag);
    });
}

function updatePredictButton() {
    if (predictBtn) {
        predictBtn.disabled = symptoms.length === 0;
    }
}

async function predictDiseases() {
    if (symptoms.length === 0) return;
    
    // Simple prediction logic
    let prediction = '';
    let confidence = 'Medium';
    
    if (symptoms.includes('fever') && symptoms.includes('cough')) {
        prediction = 'Common Cold or Flu';
        confidence = 'High';
    } else if (symptoms.includes('chest pain') && symptoms.includes('shortness of breath')) {
        prediction = 'Possible Heart Condition';
        confidence = 'High';
    } else {
        prediction = 'General Health Concern';
        confidence = 'Low';
    }
    
    try {
        // Store prediction in Firestore (v9 syntax)
        await addDoc(collection(db, 'predictions'), {
            symptoms: symptoms,
            prediction: prediction,
            confidence: confidence,
            timestamp: serverTimestamp()
        });
        
        window.location.href = `results.html?prediction=${encodeURIComponent(prediction)}&confidence=${confidence}`;
    } catch (error) {
        console.error("Error saving prediction: ", error);
        alert("Failed to save prediction. Please try again.");
    }
}

// Make functions available globally
window.removeSymptom = removeSymptom;