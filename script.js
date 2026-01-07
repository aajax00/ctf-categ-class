// --- CLASSEMENTS PAR CATÉGORIE ---

// --- INIT ---
document.addEventListener("DOMContentLoaded", () => {
    // Charger et afficher les classements par catégorie
    loadCategoryRankings();
});

async function loadCategoryRankings() {
    try {
        // Charger les 3 fichiers CSV
        const [challengesCSV, solvesCSV, usersCSV] = await Promise.all([
            fetch('GUARDIA NATIONAL CTF-challenges.csv').then(r => r.text()),
            fetch('GUARDIA NATIONAL CTF-solves.csv').then(r => r.text()),
            fetch('GUARDIA NATIONAL CTF-users.csv').then(r => r.text())
        ]);

        // Parser les CSV
        const challenges = parseCSV(challengesCSV);
        const solves = parseCSV(solvesCSV);
        const users = parseCSV(usersCSV);

        console.log('Challenges parsés:', challenges.length);
        console.log('Solves parsés:', solves.length);
        console.log('Users parsés:', users.length);

        // Créer un mapping des challenges par ID
        const challengeMap = {};
        challenges.forEach(challenge => {
            if (!challenge.id || !challenge.category) return;
            
            // Normaliser les noms de catégories
            let category = challenge.category.trim();
            const categoryLower = category.toLowerCase();
            
            // Normaliser toutes les variantes
            if (categoryLower === 'osint') {
                category = 'OSINT';
            } else if (categoryLower === 'forensics') {
                category = 'Forensics';
            } else if (categoryLower === 'cryptography') {
                category = 'Cryptography';
            } else if (categoryLower === 'reverse engineering') {
                category = 'Reverse Engineering';
            } else if (categoryLower === 'web exploitation') {
                category = 'Web Exploitation';
            } else if (categoryLower === 'pwn') {
                category = 'Pwn';
            } else if (categoryLower === 'rules') {
                return; // Ignorer la catégorie "rules"
            }
            
            challengeMap[challenge.id] = {
                name: challenge.name,
                category: category,
                value: parseInt(challenge.value) || 0
            };
        });

        console.log('Challenges dans le map:', Object.keys(challengeMap).length);
        
        // Log des catégories uniques
        const uniqueCategories = new Set();
        Object.values(challengeMap).forEach(ch => uniqueCategories.add(ch.category));
        console.log('Catégories uniques trouvées dans challenges:', Array.from(uniqueCategories));

        // Créer un mapping des utilisateurs par ID
        const userMap = {};
        
        users.forEach(user => {
            if (!user.id) return;
            
            // Exclure les utilisateurs cachés (vérification insensible aux apostrophes)
            const userName = user.name || '';
            if (userName.toLowerCase().includes('cetop1m') || 
                userName.toLowerCase().includes('guardiaosintschool')) {
                return;
            }
            
            userMap[user.id] = {
                name: user.name,
                affiliation: user.affiliation || ''
            };
        });

        // Calculer les scores par catégorie pour chaque utilisateur
        const categoryScores = {};

        solves.forEach(solve => {
            const challenge = challengeMap[solve.challenge_id];
            const user = userMap[solve.user_id];

            if (challenge && user) {
                const category = challenge.category;
                const userName = user.name;
                
                if (!categoryScores[category]) {
                    categoryScores[category] = {};
                }

                if (!categoryScores[category][userName]) {
                    categoryScores[category][userName] = {
                        score: 0,
                        solves: 0,
                        affiliation: user.affiliation
                    };
                }

                categoryScores[category][userName].score += challenge.value;
                categoryScores[category][userName].solves += 1;
            }
        });

        // Log des catégories trouvées pour debug
        console.log('Catégories avec des solves:', Object.keys(categoryScores));
        
        // Afficher les classements
        displayCategoryRankings(categoryScores);

    } catch (error) {
        console.error('Erreur lors du chargement des classements par catégorie:', error);
    }
}

function parseCSV(csvText) {
    const lines = csvText.split('\n');
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    
    let i = 1;
    while (i < lines.length) {
        let currentLine = lines[i];
        
        // Compter les guillemets pour savoir si la ligne est complète
        let quoteCount = 0;
        for (let char of currentLine) {
            if (char === '"') quoteCount++;
        }
        
        // Si nombre impair de guillemets, continuer à ajouter des lignes
        while (quoteCount % 2 !== 0 && i + 1 < lines.length) {
            i++;
            currentLine += '\n' + lines[i];
            for (let char of lines[i]) {
                if (char === '"') quoteCount++;
            }
        }
        
        // Parser la ligne complète
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let j = 0; j < currentLine.length; j++) {
            const char = currentLine[j];
            
            if (char === '"') {
                if (inQuotes && j + 1 < currentLine.length && currentLine[j + 1] === '"') {
                    current += '"';
                    j++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());
        
        // Créer l'objet si on a assez de champs
        if (values.length >= headers.length - 3) {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index] ? values[index].trim() : '';
            });
            
            // Ne garder que les lignes avec un ID valide
            if (obj.id && obj.id !== '') {
                data.push(obj);
            }
        }
        
        i++;
    }

    return data;
}

function displayCategoryRankings(categoryScores) {
    const container = document.getElementById('category-rankings');
    container.innerHTML = ''; // Vider le conteneur
    
    // Trier les catégories par ordre alphabétique
    const categories = Object.keys(categoryScores).sort();

    categories.forEach(category => {
        // Créer un tableau des utilisateurs avec leurs scores
        const userScores = Object.entries(categoryScores[category])
            .map(([name, data]) => ({
                name: name,
                score: data.score,
                solves: data.solves,
                affiliation: data.affiliation || ''
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 5); // Top 5

        // Créer la section de catégorie
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-section';

        const categoryTitle = document.createElement('h3');
        categoryTitle.className = 'category-name';
        categoryTitle.textContent = `> ${category}`;
        categoryDiv.appendChild(categoryTitle);

        // Créer le tableau
        const table = document.createElement('table');
        table.className = 'category-table';

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th style="width: 15%; text-align: left">#</th>
                <th style="width: 50%; text-align: left">PSEUDO</th>
                <th style="width: 20%; text-align: center">CAMPUS</th>
                <th style="width: 15%; text-align: right" title="Points totaux obtenus dans cette catégorie">SCORE</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        userScores.forEach((user, index) => {
            const row = document.createElement('tr');
            
            let medal = '';
            if (index === 0) medal = '🥇';
            else if (index === 1) medal = '🥈';
            else if (index === 2) medal = '🥉';

            // Formater l'affiliation
            let affiliationDisplay = '';
            if (user.affiliation) {
                const aff = user.affiliation.toUpperCase();
                let affiliationClass = '';
                if (aff.includes('PARIS')) {
                    affiliationClass = 'campus-paris';
                    affiliationDisplay = 'PARIS';
                } else if (aff.includes('LYON')) {
                    affiliationClass = 'campus-lyon';
                    affiliationDisplay = 'LYON';
                } else if (aff.includes('BORDEAUX')) {
                    affiliationClass = 'campus-bordeaux';
                    affiliationDisplay = 'BORDEAUX';
                } else {
                    affiliationDisplay = aff;
                }
                affiliationDisplay = `<span class="campus-tag ${affiliationClass}">${affiliationDisplay}</span>`;
            }

            row.innerHTML = `
                <td>${medal} ${index + 1}</td>
                <td>${user.name}</td>
                <td style="text-align: center">${affiliationDisplay}</td>
                <td>${user.score}</td>
            `;
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        categoryDiv.appendChild(table);
        container.appendChild(categoryDiv);
    });
}
