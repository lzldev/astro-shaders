#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

float circle(in vec2 _st,in vec2 center, in float _radius){
    vec2 l = _st-center;
    
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

float corner(in vec2 st,in float size){
    if ((st.x < size && st.y < size)  && (st.x > -size && st.y > -size) || (st.x > 1.-size && st.y > 1.-size) || (st.x < size && st.y > 1.-size) || (st.x > 1.-size && st.y < size)){
        return 1.;
    }else{
        return 0.;
    }
}

float scorner(in vec2 st,in float size){
    return (step(1.-size,st.x) * step(1.-size,st.y)) +
    ((1.-step(size,st.x)) * step(1.-size,st.y)) +
    ((1.-step(size,st.x)) * (1.-step(size,st.y))) +
    ((step(1.-size,st.x)) * (1.-step(size,st.y)));
}

float acorner(in vec2 st,in float size){
    return 1.-step(0.1,distance(vec2(0.0),st)) +
    1.-step(0.1,distance(vec2(1.0,0.0),st)) +
    1.-step(0.1,distance(vec2(1.0,1.0),st)) +
    1.-step(0.1,distance(vec2(0.0,1.0),st));
}

float fcorner(in vec2 st,in float size){
    return 1.-step(0.1,distance(vec2(0.0),st)) +
    1.-step(0.1,distance(vec2(1.0,0.0),st)) +
    1.-step(0.1,distance(vec2(1.0,1.0),st)) +
    1.-step(0.1,distance(vec2(0.0,1.0),st));
}

float dcorner(in vec2 st,in float size){
      return 1.-step(size,dot(st,vec2(1.,1.0))) +
             1.-step(size,dot(st-1.,vec2(-1.0,-1.0))) +
     			step(1.-size,dot(st,vec2(-1.,1.))) +
     			step(1.-size,dot(st,vec2(1.,-1.)));
}

float diad(in vec2 st,in float size){
      return 1.-(dcorner(st,size));
}


void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    // st += vec2(cos(u_time),sin(u_time*0.5));
    vec3 color = vec3(0.0);

    st *= 3.0;      // Scale up the space by 3
    st = fract(st); // Wrap around 1.0

    // Now we have 9 spaces that go from 0-1

    vec3 fade = vec3(st,1.0);
    color = vec3(st,1.0);
    color += vec3(1.) * circle(st,vec2(0.5),1.05);
    // color += vec3(1.) * -1.*((circle(st,0.9) - circle(st,1.)));
    // color += vec3(circle(st,vec2(0.0,0.5),.5));
    // color += fade * circle(st,vec2(0.125,0.),.5);
    
    // color += vec3(circle(st,1.));
    // color += vec3(circle(st,0.5) * vec3(st.x,1.,1.0));
    
    // color += vec3(1.0) * corner(st,0.068);
    
    // color += vec3(1.) * (step(0.9,st.x) * step(0.9,st.y));
    // color += vec3(1.) * ((1.-step(0.1,st.x)) * step(0.9,st.y));
    // color += vec3(1.) * ((1.-step(0.060,st.x)) * (1.-step(0.1,st.y)));
    // color += vec3(1.) * ((step(0.9,st.x)) * (1.-step(0.1,st.y)));
    // color += vec3(1.) * scorner(st,0.116);
    // color += vec3(1.) * 1.-step(0.1,distance(vec2(0.0),st));
    // color += vec3(1.) * 1.-step(0.1,distance(vec2(1.0,0.0),st));
    // color += vec3(1.) * 1.-step(0.1,distance(vec2(1.0,1.0),st));
    // color += vec3(1.) * 1.-step(0.1,distance(vec2(0.0,1.0),st));
    
    // color += vec3(1.) * 1.-step(0.784,distance(vec2(0.0,0.0),st) + (abs(dot(st,vec2(1.0,0))) + abs(dot(st,vec2(0.0,1.0)))));
//     color += vec3(1.) * 1.-step(0.2,dot(st,vec2(1.,1.0)));
//     color += vec3(1.) * 1.-step(0.2,dot(st-1.,vec2(-1.0,-1.0)));
    
//     color += vec3(1.) * step(0.8,dot(st,vec2(-1.,1.)));
//     color += vec3(1.) * step(0.8,dot(st,vec2(1.,-1.)));
    
    color += vec3(1.0) * dcorner(st,0.1);
    // color += vec3(1.,0.,0.5) * diad(st,0.5);
    // color += vec3(1.) * 1.-step(0.2,dot(vec2(0.)-st,vec2(1.)));
    // color += vec3(1.) * 1.-step(0.1,distance(vec2(0.0,0.0),st));
    // color += vec3(1.) * fcorner(st,0.1);

	gl_FragColor = vec4(color,1.0);
}