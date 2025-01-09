#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}


void main() {
    vec2 norm = gl_FragCoord.xy/u_resolution.xy;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec2 m = u_mouse / u_resolution.xy;
    m.x *= u_resolution.x/u_resolution.y;

    float mul = 20.;
    st *= mul;
    m *= mul;
    
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);
    float r = random(ipos);
    

    vec3 color = vec3(1.0,0.,0.);

    float m_dist = 1.;  // minimum distance
    
    for(int y =-1; y <= 1; y++){
        for(int x =-1; x <= 1; x++){
            vec2 point = vec2(float(x),float(y));
            float d1r= random(point);
            vec2 random = random2(ipos+point);
            random = 0.5 + 0.5*sin(u_time + 6.2831*random);

            vec2 diff = point + random - fpos;
            float dist = length(diff);
            m_dist = min(m_dist,dist);
        }    
    }
    m_dist = min(m_dist,length(st - m));

    // Draw the min distance (distance field)
    color = vec3(1.,0.1,0.1) * mix(0.5,1.,m_dist);

    // Show isolines
    // color -= step(.7,abs(sin(50.0*m_dist)))*.3;

    gl_FragColor = vec4(color,1.0);
}