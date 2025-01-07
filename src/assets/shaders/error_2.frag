
#ifdef GL_ES
precision lowp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    float res = 10.;

    vec2 norm = (gl_FragCoord.xy/u_resolution.xy) * res;
    
    float x_mod = floor(mod(norm.x,2.));
    float y_mod = floor(mod(norm.y,2.));

    vec3 color = vec3(0.);
    if(x_mod == y_mod){
        color += vec3(1.0,0.0,1.0);
    }

    gl_FragColor = vec4(color,1.0);
}