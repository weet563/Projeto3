const { option } = require("grunt");

//Iniciar o grunt
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //Compilando o LESS
        less: {
            //Arquivos para desenvolvimento 
            development: {
                files: { 
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            //Arquivos para produção/final
            production: {
                //comprimir o arquivo
                options: {
                    compress: true,
                },
                //destino e origem
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },
        //Compilando o SASS
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'main2.css': 'main.scss'
                }
            }
        },
        //Iniciar tarefas em SERIES -baixa o 'npm i --save-dev grunt-concurrent'
        concurrent: {
            //indica as tarefas
            target: ['olaGrunt', 'less', 'sass', 'taskDemorada']
        },
        //Assistir o arquivo e mudar automatico
        watch: {
            less: {
                //lugar de assistir
                files: ['src/styles/**/*.less'],
                //lugar de mudar
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:PastaDev']
            }
        },
        // Substitui o endereço do CSS ou qualquer coisa
        replace: {
            PastaDev: {
                //Termos que ocorrerá a substituição
                options: {
                    patterns: [
                        {
                            //Oque será substituido e Pelo q será subsituido
                            match: 'ENDEREÇO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDEREÇO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                //Onde ele irá fazer a substituição
                files: [
                    {
                        //Expandir e Achatar
                        expand: true,
                        flatten: true,
                        //Os arquivos de substituir
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            PastaDist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDEREÇO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDEREÇO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }   
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        //Minifica o arquivo HTML
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    });

    //Tarefa comum
    grunt.registerTask('olaGrunt', function() {
        const done = this.async();

        setTimeout(() => {
            console.log('Olá Grunt');
            done();
        }, 3000);
    });

    grunt.registerTask('taskDemorada', function() {
        const done = this.async();

        setTimeout(() => {
            console.log('Olá Curru!');
            done();
        }, 3000);
    })

    //Quando add um PLUGIN precisa criar esse código
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify')

    //Tarefa DEFAULT
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin', 'replace:PastaDist','clean', 'uglify']);
} 