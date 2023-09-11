package io.ecocode.javascript.checks;

        import org.sonar.check.Rule;
        import org.sonar.plugins.javascript.api.EslintBasedCheck;
        import org.sonar.plugins.javascript.api.JavaScriptRule;
        import org.sonar.plugins.javascript.api.TypeScriptRule;

@JavaScriptRule
@TypeScriptRule
@Rule(key = UseLoopsInsteadOfForEachReduce.RULE_KEY)
public class UseLoopsInsteadOfForEachReduce implements EslintBasedCheck {

    public static final String RULE_KEY = "EC53";

    @Override
    public String eslintKey() {
        return "@ecocode/use-loop-insteadof-reduce-foreach";
    }

}
