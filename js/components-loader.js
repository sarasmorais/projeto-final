/**
 * Carregador de componentes
 * Carrega os componentes HTML de forma assíncrona
 */
class ComponentsLoader {
    constructor() {
        this.componentsPath = 'components/';
        this.components = [
            { id: 'cabecalho', file: 'cabecalho.html' },
            { id: 'section1', file: 'elias.html' }, 
            { id: 'section2', file: 'vinicius.html' },
            { id: 'section3', file: 'adriana.html' },
            { id: 'section4', file: 'marcos.html' },
            { id: 'section5', file: 'daniel.html' },
            { id: 'footer', file: 'footer.html' }
        ];
    }

    /**
     * Carrega um componente HTML
     * @param {string} url - URL do arquivo HTML
     * @returns {Promise<string>} - Conteúdo HTML
     */
    async fetchComponent(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro ao carregar ${url}: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.error(`Erro ao carregar componente: ${error.message}`);
            return `<div class="error">Erro ao carregar componente: ${error.message}</div>`;
        }
    }

    /**
     * Carrega todos os componentes
     */
    async loadAllComponents() {
        const loadPromises = this.components.map(async (component) => {
            const html = await this.fetchComponent(this.componentsPath + component.file);
            const container = document.getElementById(component.id);
            if (container) {
                container.innerHTML = html;
            } else {
                console.warn(`Container #${component.id} não encontrado`);
            }
            return { id: component.id, loaded: !!container };
        });

        const results = await Promise.all(loadPromises);
        console.log('Componentes carregados:', results);
        
        // Dispara um evento quando todos os componentes forem carregados
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    }
}

// Inicializa o carregador de componentes quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const loader = new ComponentsLoader();
    loader.loadAllComponents();
});