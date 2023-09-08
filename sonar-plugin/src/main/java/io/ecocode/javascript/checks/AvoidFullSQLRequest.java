package io.ecocode.javascript.checks;

import org.sonar.check.Rule;
import org.sonar.plugins.javascript.api.EslintBasedCheck;
import org.sonar.plugins.javascript.api.JavaScriptRule;
import org.sonar.plugins.javascript.api.TypeScriptRule;

@JavaScriptRule
@TypeScriptRule
@Rule(key = AvoidFullSQLRequest.RULE_KEY)
public class AvoidFullSQLRequest implements EslintBasedCheck {

    public static final String RULE_KEY = "EC74";

    @Override
    public String eslintKey() {
        return "@ecocode/avoid-high-accuracy-geolocation";
    }

}
