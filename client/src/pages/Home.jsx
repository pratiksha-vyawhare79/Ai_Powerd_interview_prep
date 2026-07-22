import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Button from '../components/common/Button/Button';
import { Sparkles, Mic, Award, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center py-20 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-primary-600/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/5 text-xs font-semibold text-primary-400 mb-6 uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Mock Interviews
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Master Your Next Interview with{' '}
            <span className="bg-gradient-to-r from-primary-400 to-indigo-400 bg-clip-text text-transparent">
              PrepAI
            </span>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Practice realistic, role-specific technical and behavioral questions. Get instant score breakdowns, granular critique, and model suggested answers.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to={isAuthenticated ? '/dashboard' : '/register'} className="w-full sm:w-auto">
              <Button size="lg" className="w-full flex items-center gap-2 group">
                Get Started Free
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-slate-900 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white">How PrepAI Works</h2>
            <p className="text-sm text-slate-400 mt-2">Professional interview practice designed to build real confidence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-6 rounded-2xl border border-slate-900 flex flex-col items-start hover:border-slate-800 transition-colors">
              <div className="p-3 bg-primary-500/10 rounded-xl mb-4 border border-primary-500/20">
                <Mic className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">Voice & Text Input</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Respond out loud using our Web Speech transcription tool or type out your answers. Replicate actual interview environments.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-6 rounded-2xl border border-slate-900 flex flex-col items-start hover:border-slate-800 transition-colors">
              <div className="p-3 bg-emerald-500/10 rounded-xl mb-4 border border-emerald-500/20">
                <Award className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">Instant AI Assessment</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Evaluate your answers instantly. Receive granular score summaries, relevance assessments, and actionable improvement feedback.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-6 rounded-2xl border border-slate-900 flex flex-col items-start hover:border-slate-800 transition-colors">
              <div className="p-3 bg-indigo-500/10 rounded-xl mb-4 border border-indigo-500/20">
                <FileText className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">Model Answers</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Compare your attempts against professional suggested model answers tailored to your specific role and question.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
