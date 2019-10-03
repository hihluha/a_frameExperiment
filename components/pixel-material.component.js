export default AFRAME.registerComponent('s-pixel-material', {
    schema: {
        textureFile: {
            type: 'string'
        }
    },
    init: function () {
        const fragmentShader = document.getElementById('fragment').textContent,
            vertexShader = document.getElementById('vertex').textContent;

        new Promise(res => {
            new THREE.TextureLoader()
                .load(this.data.textureFile, txt => res(txt));
        }).then(texture => {
            this.material = new THREE.ShaderMaterial({
                uniforms: {
                    texSampler: { value: texture},
                    repeat: { value: { x: 1.0, y: 1.0 } },
                },
                vertexShader,
                fragmentShader
            });

            this.applyToMesh();
        });

    },

    applyToMesh: function () {
        const mesh = this.el.getObject3D('mesh');
        if (mesh) {
            this.material.uniforms.repeat.value.x = +this.el.getAttribute("width") || 1;
            this.material.uniforms.repeat.value.y = +this.el.getAttribute("height") || 1;
            mesh.material = this.material;
        }
    }
});