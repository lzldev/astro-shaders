#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    float speed = 0.5;
    vec2 center = vec2(0.5);

    vec2 norm = gl_FragCoord.xy / u_resolution.xy;
    
    vec2 vdist = gl_FragCoord.xy-(u_resolution/2.);
    float dist = dot(vdist,vdist) * 4.;

    float res = u_resolution.x / 8.;
    
    res *= 1.-(dist / 8.);
    //float mul = sin(u_time * speed) * 0.1;
    norm.x += cos(u_time * speed) * 0.1;
    norm.y += sin(u_time * speed) * 0.1;

    float stretch_y = 2.;
    float stretch_x = 3.3;

    float x_10 = ceil(ceil((norm.x * res) * stretch_y));
    float y_10 = ceil(ceil((norm.y * res) * stretch_x));
    
    float x_mod = mod(x_10,2.);
    float y_mod = mod(y_10,2.);
    
    vec3 color = vec3(0.);

    if(x_mod == y_mod){
        color += vec3(0.0,0.0,1.0);
    }else if(x_mod == 0.){
        color += vec3(1.0,0.0,0.0);
    }else if(y_mod == 0.){
        color += vec3(0.0,1.0,0.0);
    }
    
    gl_FragColor = vec4(color,1.0);
}
