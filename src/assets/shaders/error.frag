#ifdef GL_ES
precision lowp float;
#endif

uniform vec2 u_resolution;

uniform vec2 u_mouse;

void main() {
    vec2 norm = gl_FragCoord.xy/u_resolution.xy;
    float x_10 = ceil(norm.x * 10.);
    float y_10 = ceil(norm.y * 10.);
    
    float x_mod = mod(x_10,2.);
    float y_mod = mod(y_10,2.);

    if(x_mod == y_mod){
        gl_FragColor = vec4(1.0,0.0,1.0,1.0);
    }else{
        gl_FragColor = vec4(0.0,0.0,0.0,1.0);
    }
}