package io.ecocode.javascript.checks;

import org.sonar.check.Rule;
import org.sonar.plugins.javascript.api.EslintBasedCheck;
import org.sonar.plugins.javascript.api.JavaScriptRule;
import org.sonar.plugins.javascript.api.TypeScriptRule;

@JavaScriptRule
@TypeScriptRule
@Rule(key = AvoidSmallSwitch.RULE_KEY)
public class AvoidSmallSwitch implements EslintBasedCheck {

    public static final String RULE_KEY = "ECCustom";

    @Override
    public String eslintKey() {
        return "@ecocode/avoid-small-switch";
    }

}
