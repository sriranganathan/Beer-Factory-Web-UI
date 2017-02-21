function Particle( x, y, radius ) {
    this.init( x, y, radius );
}

Particle.prototype = {

    init: function( x, y, radius ) {
        this.alive = true;

        this.radius = radius || 10;
        this.wander = 0.15;
        this.theta = random( TWO_PI );
        this.drag = 0.92;
        //this.color = '#fff';
        this.hue;

        this.x = x || 0.0;
        this.y = y || 0.0;

        this.vx = 0.0;
        this.vy = 0.0;
    },

    move: function(bubble) {
        if (!bubble) {
            this.x += this.vx;
            this.y += this.vy;

            this.vx *= this.drag;
            this.vy *= this.drag;

            this.theta += random( -0.5, 0.5 ) * this.wander;
            this.vx += sin( this.theta ) * 0.1;
            this.vy += cos( this.theta ) * 0.1;

            this.radius *= 0.96;
            this.alive = this.radius > 0.5;
         } else {

            this.x += this.vx;
            this.y += this.vy;

            this.vx *= this.drag;
            //this.vy *= this.drag;

            this.theta += random( -0.5, 0.5 ) * this.wander;
            this.vx += sin( this.theta ) * 0.1;
            //this.vy += cos( this.theta ) * 0.1;
        }
    },

    draw: function( ctx ) {
        ctx.beginPath();
        ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
        ctx.fillStyle = 'hsla(' + this.hue + ', 0%, 100%, .35)';
        ctx.strokeStyle = 'hsla(' + this.hue + ', 0%, 90%, .35)';
        ctx.fill();
    },

    update: function () {
        if (this.x < - this.maxRadius || this.x > demo.width + this.maxRadius || this.y < - this.maxRadius) {
            this.x = random( demo.width )
            this.y = random( demo.height + this.maxRadius, demo.height * 2 )
            this.vx = 0
            this.vy = -random( 1, 10 ) / 5
        }
    }
};

var MAX_PARTICLES = 800,
    MAX_BACKGROUND_PARTICLES = 1500,

    particles = [],
    pool = [],

    backgroundParticles = [],
    backgroundPool = [],
    demo;

function initiateBubbles() {
    if (document.getElementById('container')) {
        demo = Sketch.create({
            container: document.getElementById( 'container' )
        });

        demo.setup = function() {
            var i, x, y, z;

            for ( i = 0; i < 20; i++ ) {
                x = ( demo.width * 0.5 ) + random( -100, 100 );
                y = ( demo.height * 0.5 ) + random( -100, 100 );
                demo.spawn( x, y );
            }

            for ( z = 0; z < MAX_BACKGROUND_PARTICLES; z++ ) {

                x = ( demo.width * 0.5 ) + random( -300, 300 );

                y = ( demo.height ) + random( 0, 100 );
                demo.spawnBackground( x, y );
            }
        };

        demo.spawn = function( x, y ) {
            var radius = random( 5, 40 ),
                particle;

            if ( particles.length >= MAX_PARTICLES )
                pool.push( particles.shift() );

            particle = pool.length ? pool.pop() : new Particle();
            particle.init( x, y, radius );

            particle.wander = random( 0.5, 2.0 );
            particle.hue = random( 30, 50 );
            particle.drag = random( 0.9, 0.99 );

            theta = random( TWO_PI );
            force = random( 2, 8 );

            particle.vx = sin( theta ) * force;
            particle.vy = cos( theta ) * force;

            particles.push( particle );
        };

        demo.spawnBackground = function (x, y) {
            var backgroundParticle;

            if ( backgroundParticles.length >= MAX_BACKGROUND_PARTICLES )
                backgroundPool.push( backgroundParticles.shift() );

            backgroundParticle = backgroundPool.length ? backgroundPool.pop() : new Particle();

            backgroundParticle.init( x, y, random(2, 4) );

            backgroundParticle.wander = random( 0.5, 2.0 );
            backgroundParticle.hue = random( 30, 50 );
            backgroundParticle.drag = random( 0.9, 0.99 );

            theta = random( TWO_PI );
            force = random( 2, 8 );

            backgroundParticle.vx = sin( theta ) * force;
            backgroundParticle.vy = cos( theta ) * force;

            backgroundParticles.push( backgroundParticle );
        }

        demo.update = function() {
            var i,
                x,
                z = backgroundParticles.length,
                particle,
                backgroundParticle;

            for (i = particles.length - 1; i >= 0; i-- ) {

                particle = particles[i];

                if ( particle.alive ) particle.move();
                else pool.push( particles.splice( i, 1 )[0] );
            }

            for (x = backgroundParticles.length - 1; x >= 0; x-- ) {

                backgroundParticle = backgroundParticles[x];

                if ( backgroundParticle.alive ) backgroundParticle.move(true);
                else backgroundPool.push( backgroundParticles.splice( x, 1 )[0] );
            }
        };

        demo.draw = function() {
            demo.globalCompositeOperation  = 'lighter';

            for ( var i = particles.length - 1; i >= 0; i-- ) {
                particles[i].draw( demo );
            }

            for ( var x = backgroundParticles.length - 1; x >= 0; x-- ) {
                backgroundParticles[x].draw( demo );
            }
        };

        demo.mousemove = function() {
            var particle, theta, force, touch, max, i, j, n;

            for ( i = 0, n = demo.touches.length; i < n; i++ ) {

                touch = demo.touches[i], max = random( 1, 4 );
                for ( j = 0; j < max; j++ ) {
                  demo.spawn( touch.x, touch.y );
                }
            }
        };
    }
}

initiateBubbles();