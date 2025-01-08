#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    //st -= vec2(0.5,0.);
    
    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*4.;
    float r2 = 1.-(r*2.096);
    
    float a = atan(pos.y,pos.x) + u_time * 0.5;

    float f = cos(a*3.);
    f = abs(cos(a*3.));
    
    // f = min(f,cos(-1.*f));
    f = min(f,step(0.5,f));
    f = min(f,1.-smoothstep(0.495,0.5,r2));
    
    // f = max(f,cos(-1.*f));
    // f = abs(cos(a*2.5))*.5+.3;
    // f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
    // f = smoothstep(-.5,1., cos(a*9.632))*0.2+0.5;

    vec3 color = vec3(1.);
    vec3 pcolor = vec3(st.x,st.y,.0);

    color -= pcolor * 1.-smoothstep(f,f+0.02,r);

    gl_FragColor = vec4(color, 1.0);
}
