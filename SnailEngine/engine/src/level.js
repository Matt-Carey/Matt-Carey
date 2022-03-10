import { EntityFactory } from './factory/EntityFactory.js';
import { TemplateFactory } from './factory/templateFactory.js';
import { UUID } from './util/uuid.js';

class Level {
	#world = null;
	#entities = [];

	constructor(world, json) {
		this.#world = world;
		for(const templateJson of json.templates) {
			const templatePath = templateJson.path;
			const templateOverrides = templateJson.overrides;
			TemplateFactory.get(templatePath).then(template => {
				template = JSON.parse(JSON.stringify(template));
				for(const key in template) {
					const entity = template[key];
					if(key in templateOverrides) {
						for(const property in templateOverrides[key]) {
							entity.json[property] = templateOverrides[key][property];
						}
					}
					EntityFactory.make(this.#world, entity.UUID, entity.meta, entity.json).then(entity => {
						this.#entities.push(entity);
					});
				}
			});
		}
		for(const entity of json.entities) {
			EntityFactory.make(this.#world, UUID.get(), entity.meta, entity.json).then(entity => {
				this.#entities.push(entity);
			});
		}
		return this;
	}

	get world() {
		return this.#world;
	}

}

export { Level };